"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import { CtaIntrigued } from "@/components/cta";
import SearchBar from "@/components/search";
import MailingListBanner from "@/components/mailingListBanner";

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type WpLink =
  | { target?: string; title?: string; url?: string }
  | null
  | undefined;

type PodcastLink = {
  podLink?: WpLink;
  rssFeed?: WpLink;
  spotifyPodcast?: WpLink;
} | null;

type TaxNode = { id?: string; name?: string; slug?: string; link?: string };

type Episode = {
  id?: string;
  slug: string;
  link: string;
  title: string;
  displayTitle: string;
  episodeBadge: string | null;
  date: string;
  podcastId?: string | null;
  content: string;
  featuredImage?: {
    node?: { localFile?: { publicURL?: string }; altText?: string | null };
  } | null;
  podcastLink?: PodcastLink;
  seasons?: TaxNode[];
  guests?: TaxNode[];
  hosts?: TaxNode[];
};

type PodcastViewProps = {
  data: {
    podcast: {
      nodes: {
        metadata?: { metaTitle?: string; metaDescription?: string };
        featuredBlogImage?: {
          node?: { localFile?: { publicURL?: string } };
        } | null;
        themePicker?: { themePicker?: string };
        podcastHero?: {
          podcastHeroTitle?: string;
          podcastHeroDescription?: string;
          podcastHeroSubDescription?: string;
        };
      }[];
    };
    allPodcastEpisodes: { edges: { episode: Episode }[] };
  };
};

function PodcastCard({ episode, activeSeason }: { episode: Episode; activeSeason: string }) {
  const imgUrl = episode.featuredImage?.node?.localFile?.publicURL;
  const imgAlt = episode.featuredImage?.node?.altText || episode.displayTitle;
  const href = `${episode.link}?from=${activeSeason}`;

  return (
    <div className="podcast-card">
      <Link
        href={href}
        className="podcast-card-image-wrap"
        aria-label={episode.displayTitle}
      >
        {imgUrl ? (
          <img src={imgUrl} alt={imgAlt || ""} className="podcast-card-image" />
        ) : (
          <div className="podcast-card-image podcast-card-image--placeholder" />
        )}
      </Link>

      <div className="podcast-card-meta">
        <div className="podcast-card-meta-top">
          {episode.date && (
            <span className="podcast-card-date">{episode.date}</span>
          )}
          {episode.episodeBadge && (
            <span className="podcast-card-id">{episode.episodeBadge}</span>
          )}
        </div>
        <Link href={href} className="podcast-card-title">
          {episode.displayTitle}
        </Link>
      </div>
    </div>
  );
}

export default function PodcastView({ data }: PodcastViewProps) {
  const router = useRouter();
  const pageNode = data.podcast.nodes[0] ?? {};
  const { metadata, featuredBlogImage, themePicker, podcastHero } =
    pageNode as PodcastViewProps["data"]["podcast"]["nodes"][0];
  const metaImage = featuredBlogImage?.node?.localFile?.publicURL;

  const episodes = data.allPodcastEpisodes.edges.map((e) => e.episode);

  const [numEpisodes, setNumEpisodes] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSeason, setActiveSeason] = useState<string>("all");

  const seasons = useMemo(() => {
    const seen = new Map<string, string>();
    for (const ep of episodes) {
      for (const s of ep.seasons ?? []) {
        if (s.slug && s.name && !seen.has(s.slug)) seen.set(s.slug, s.name);
      }
    }
    return Array.from(seen.entries()).map(([slug, name]) => ({ slug, name }));
  }, [episodes]);

  const initialized = useRef(false);
  const stateRef = useRef({
    searchQuery: "",
    numEpisodes: 12,
    activeSeason: "all",
  });
  stateRef.current = { searchQuery, numEpisodes, activeSeason };

  useEffect(() => {
    if (!router.isReady || initialized.current) return;
    initialized.current = true;
    const q = typeof router.query.s === "string" ? router.query.s : "";
    const p =
      typeof router.query.episodes === "string"
        ? parseInt(router.query.episodes, 10)
        : NaN;
    const season =
      typeof router.query.season === "string" ? router.query.season : "all";
    setSearchQuery(q);
    if (!isNaN(p) && p > 0) setNumEpisodes(p);
    setActiveSeason(season);
  }, [router.isReady, router.query]);

  const pushToUrl = (s: string, eps: number, season: string) => {
    const query: Record<string, string> = {};
    if (s) query.s = s;
    if (eps > 12) query.episodes = String(eps);
    if (season !== "all") query.season = season;
    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  const handleLoadMoreClick = () => {
    const n = numEpisodes + 12;
    setNumEpisodes(n);
    pushToUrl(searchQuery, n, activeSeason);
  };

  const handleSeasonChange = (slug: string) => {
    setActiveSeason(slug);
    setNumEpisodes(12);
    pushToUrl(searchQuery, 12, slug);
  };

  useEffect(() => {
    if (!initialized.current) return;
    const t = setTimeout(() => {
      const {
        searchQuery: s,
        numEpisodes: eps,
        activeSeason: season,
      } = stateRef.current;
      pushToUrl(s, eps, season);
    }, 500);
    return () => clearTimeout(t);
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const pool = useMemo(() => {
    let filtered = episodes;
    if (activeSeason !== "all") {
      filtered = filtered.filter((ep) =>
        ep.seasons?.some((s) => s.slug === activeSeason),
      );
    }
    if (!searchQuery.trim()) return filtered;
    const q = searchQuery.toLowerCase();
    return filtered.filter((ep) =>
      `${ep.title} ${stripHtml(ep.content)}`.toLowerCase().includes(q),
    );
  }, [episodes, searchQuery, activeSeason]);

  const visibleEpisodes = pool.slice(0, numEpisodes);

  return (
    <>
      <BodyClass
        className={`dark dark-blog dark-header dark-footer ${themePicker?.themePicker ?? ""}`}
      />
      <Seo
        title={metadata?.metaTitle ?? "Podcast"}
        description={metadata?.metaDescription}
        image={metaImage}
      />

      {/* Hero */}
      <div className="podcast-hero section glow-bg">
        <div className="container">
          <div className="podcast-hero-inner">
            <h1
              className="podcast-hero-title"
              dangerouslySetInnerHTML={{
                __html: podcastHero?.podcastHeroTitle || "Podcast",
              }}
            />
            {podcastHero?.podcastHeroDescription && (
              <p className="podcast-hero-description">
                {podcastHero.podcastHeroDescription}
              </p>
            )}
            {podcastHero?.podcastHeroSubDescription && (
              <p className="podcast-hero-sub">
                {podcastHero.podcastHeroSubDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Season tabs */}
      {seasons.length > 0 && (
        <div className="podcast-seasons section">
          <div className="container">
            <div className="podcast-seasons-tabs">
              <button
                className={`podcast-season-tab${activeSeason === "all" ? " podcast-season-tab--active" : ""}`}
                onClick={() => handleSeasonChange("all")}
              >
                All
              </button>
              {seasons.map((s) => (
                <button
                  key={s.slug}
                  className={`podcast-season-tab${activeSeason === s.slug ? " podcast-season-tab--active" : ""}`}
                  onClick={() => handleSeasonChange(s.slug)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Episode grid */}
      <div className="podcast-grid-section section ml-margins">
        <div className="container">
          {visibleEpisodes.length === 0 ? (
            <p className="podcast-empty">
              {searchQuery
                ? "No episodes match your search."
                : "No episodes yet."}
            </p>
          ) : (
            <div className="podcast-grid">
              {visibleEpisodes.map((episode) => (
                <PodcastCard key={episode.slug} episode={episode} activeSeason={activeSeason} />
              ))}
            </div>
          )}

          {visibleEpisodes.length < pool.length && (
            <button
              className="btn alt-blue-btn middle podcast-load-more"
              type="button"
              onClick={handleLoadMoreClick}
            >
              Load more
            </button>
          )}
        </div>
      </div>

      <CtaIntrigued />
    </>
  );
}

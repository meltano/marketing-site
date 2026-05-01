"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import parse from "html-react-parser";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import { CtaIntrigued } from "@/components/cta";
import type { PodcastEpisodePageData } from "@/lib/wp/site-pages";
import podIcon from "@/assets/img/podIcon.svg";
import spotifyIcon from "@/assets/img/spotifyicon.svg";
import rssIcon from "@/assets/img/rssIcon.svg";
import appleIcon from "@/assets/img/appleIcon.svg";

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type PodcastDetailNode = {
  linkedinLink?: {
    url?: string;
  };
  catImage?: {
    sourceUrl?: string;
  };
};

type TaxNode = {
  id?: string;
  name?: string;
  slug?: string;
  link?: string;
  podcastDetail?: PodcastDetailNode;
};

type ExtendedEpisode = PodcastEpisodePageData["episode"] & {
  displayTitle?: string;
  episodeBadge?: string | null;
  seasons?: TaxNode[];
  hosts?: TaxNode[];
  guests?: TaxNode[];
};

type Props = { data: PodcastEpisodePageData };

function AvatarCircle({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="ped-avatar">
      <span className="ped-avatar-initials">{initials}</span>
    </div>
  );
}

function PersonCard({ person, role }: { person: TaxNode; role: string }) {
  return (
    <div className="ped-person-card">
      <div className="ped-person-card-header">
        {person.podcastDetail?.catImage?.sourceUrl ? (
          <Image
            src={person.podcastDetail?.catImage?.sourceUrl}
            alt={person.name || "Profile image"}
            height={60}
            width={60}
          />
        ) : (
          <AvatarCircle name={person.name || ""} />
        )}
        <div>
          <p className="ped-person-name">{person.name}</p>
          <p className="ped-person-role">{role}</p>
        </div>
      </div>
      {person.podcastDetail?.linkedinLink?.url && (
        <a
          href={person.podcastDetail?.linkedinLink?.url}
          className="ped-person-linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.75 4V10.5C12.75 10.6989 12.671 10.8897 12.5303 11.0303C12.3896 11.171 12.1989 11.25 12 11.25C11.8011 11.25 11.6103 11.171 11.4696 11.0303C11.329 10.8897 11.25 10.6989 11.25 10.5V5.8125L4.5306 12.5306C4.3897 12.6715 4.19861 12.7507 3.99935 12.7507C3.80009 12.7507 3.60899 12.6715 3.4681 12.5306C3.3272 12.3897 3.24805 12.1986 3.24805 11.9994C3.24805 11.8001 3.3272 11.609 3.4681 11.4681L10.1875 4.75H5.49997C5.30106 4.75 5.11029 4.67098 4.96964 4.53033C4.82899 4.38968 4.74997 4.19891 4.74997 4C4.74997 3.80109 4.82899 3.61032 4.96964 3.46967C5.11029 3.32902 5.30106 3.25 5.49997 3.25H12C12.1989 3.25 12.3896 3.32902 12.5303 3.46967C12.671 3.61032 12.75 3.80109 12.75 4Z"
              fill="white"
            />
          </svg>
          Linkedin
        </a>
      )}
    </div>
  );
}

function PlatformIcon({
  url,
  target,
  title,
  type,
}: {
  url: string;
  target?: string;
  title?: string;
  type: "pod" | "spotify" | "rss" | "apple";
}) {
  const icons: Record<string, React.ReactNode> = {
    pod: (
      <img
        src={podIcon as unknown as string}
        alt="Podcasts"
        style={{ width: 32, height: 32 }}
      />
    ),
    spotify: (
      <img
        src={spotifyIcon as unknown as string}
        alt="Spotify"
        style={{ width: 32, height: 32 }}
      />
    ),
    rss: (
      <img
        src={rssIcon as unknown as string}
        alt="RSS"
        style={{ width: 32, height: 32 }}
      />
    ),
    apple: (
      <img
        src={appleIcon as unknown as string}
        alt="Apple Podcasts"
        style={{ width: 32, height: 32 }}
      />
    ),
  };

  return (
    <a
      href={url}
      target={target || "_blank"}
      rel="noopener noreferrer"
      className="ped-platform-icon"
      title={title || type}
    >
      {icons[type]}
    </a>
  );
}

const PER_PAGE = 3;

export default function PodcastEpisodeView({ data }: Props) {
  const router = useRouter();
  const { relatedEpisodes } = data;
  const episode = data.episode as ExtendedEpisode;
  const [shareOpen, setShareOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState(false);
  const [page, setPage] = useState(0);
  const sharePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shareOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sharePanelRef.current &&
        !sharePanelRef.current.contains(e.target as Node)
      ) {
        setShareOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [shareOpen]);

  const totalPages = Math.ceil(relatedEpisodes.length / PER_PAGE);
  const visibleEpisodes = relatedEpisodes.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE,
  );

  const imgUrl = episode.featuredImage?.node?.localFile?.publicURL;
  const imgAlt =
    (episode.featuredImage?.node as { altText?: string } | undefined)
      ?.altText || episode.title;

  const podUrl = episode.podcastLink?.podLink?.url;
  const podTarget = episode.podcastLink?.podLink?.target;
  const spotifyUrl = episode.podcastLink?.spotifyPodcast?.url;
  const spotifyTarget = episode.podcastLink?.spotifyPodcast?.target;
  const rssUrl = episode.podcastLink?.rssFeed?.url;
  const rssTarget = episode.podcastLink?.rssFeed?.target;
  const appleUrl = episode.podcastLink?.applePodcasts?.url;
  const appleTarget = episode.podcastLink?.applePodcasts?.target;

  const displayTitle = episode.displayTitle || episode.title;
  const seasons = episode.seasons ?? [];
  const hosts = episode.hosts ?? [];
  const guests = episode.guests ?? [];
  const fromSeason = typeof router.query.from === "string" ? router.query.from : null;
  const backHref =
    fromSeason && fromSeason !== "all"
      ? `/podcasts?season=${fromSeason}`
      : "/podcasts";
  const backLabel =
    fromSeason && fromSeason !== "all"
      ? (seasons.find((s) => s.slug === fromSeason)?.name ?? fromSeason)
      : "All seasons";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage(true);
      setTimeout(() => setCopyMessage(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <>
      <BodyClass className="podcast-episode-page dark-blog dark-header dark-footer" />
      <Seo
        title={episode.title}
        description={stripHtml(episode.content || "").slice(0, 200)}
        image={imgUrl}
        article
      />

      <div className="ped-wrapper dark-blog dark-header dark-footer">
        <div className="container">
          {/* Back link */}
          <Link href={backHref} className="ped-back-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {backLabel}
          </Link>

          {/* Two-column layout */}
          <div className="ped-layout">
            <main className="ped-main">
              <h1
                className="ped-title"
                dangerouslySetInnerHTML={{ __html: displayTitle }}
              />
              <div className="blog-content-area wp-content ped-content">
                {parse(episode.content || "")}
              </div>
            </main>

            <aside className="ped-sidebar">
              {hosts.map((h) => (
                <PersonCard key={h.id || h.slug} person={h} role="Host" />
              ))}
              {guests.map((g) => (
                <PersonCard key={g.id || g.slug} person={g} role="Guest" />
              ))}

              {(podUrl || spotifyUrl || rssUrl || appleUrl) && (
                <div className="ped-listen">
                  <p className="ped-listen-label">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.00066 6.18748C8.4444 6.18748 7.90064 6.35243 7.43812 6.66147C6.97561 6.97051 6.61512 7.40976 6.40225 7.92368C6.18938 8.4376 6.13368 9.0031 6.2422 9.54867C6.35073 10.0942 6.61859 10.5954 7.01193 10.9887C7.40526 11.3821 7.9064 11.6499 8.45197 11.7584C8.99754 11.867 9.56304 11.8113 10.077 11.5984C10.5909 11.3855 11.0301 11.025 11.3392 10.5625C11.6482 10.1 11.8132 9.55624 11.8132 8.99998C11.8132 8.25406 11.5168 7.53869 10.9894 7.01124C10.462 6.48379 9.74658 6.18748 9.00066 6.18748ZM9.00066 10.6875C8.66691 10.6875 8.34065 10.5885 8.06314 10.4031C7.78563 10.2177 7.56934 9.95411 7.44162 9.64576C7.31389 9.33741 7.28048 8.99811 7.34559 8.67076C7.4107 8.34342 7.57142 8.04274 7.80742 7.80673C8.04342 7.57073 8.34411 7.41002 8.67145 7.3449C8.99879 7.27979 9.33809 7.31321 9.64644 7.44093C9.95479 7.56865 10.2183 7.78494 10.4038 8.06245C10.5892 8.33996 10.6882 8.66622 10.6882 8.99998C10.6882 9.44753 10.5104 9.87675 10.1939 10.1932C9.87744 10.5097 9.44822 10.6875 9.00066 10.6875ZM14.1834 11.1895C13.9417 11.7609 13.6072 12.2883 13.1934 12.7504C13.0932 12.8589 12.9544 12.9236 12.8069 12.9305C12.6594 12.9375 12.5151 12.8862 12.4051 12.7878C12.2951 12.6893 12.2283 12.5515 12.2189 12.4042C12.2096 12.2569 12.2586 12.1118 12.3553 12.0002C13.0939 11.1755 13.5023 10.1074 13.5023 9.00033C13.5023 7.89327 13.0939 6.82511 12.3553 6.00045C12.3046 5.94564 12.2654 5.88131 12.2398 5.8112C12.2143 5.74109 12.203 5.66659 12.2065 5.59205C12.21 5.51752 12.2284 5.44443 12.2604 5.37704C12.2925 5.30965 12.3376 5.24932 12.3932 5.19955C12.4488 5.14978 12.5138 5.11157 12.5843 5.08715C12.6548 5.06273 12.7294 5.05258 12.8039 5.05729C12.8784 5.06201 12.9512 5.08149 13.018 5.11461C13.0849 5.14773 13.1445 5.19383 13.1934 5.25021C13.9037 6.04498 14.3737 7.02503 14.549 8.07641C14.7242 9.1278 14.5975 10.2073 14.1834 11.1895ZM4.85223 7.24849C4.52034 8.03414 4.41855 8.89793 4.55872 9.73921C4.69889 10.5805 5.07525 11.3646 5.64394 12.0002C5.74065 12.1118 5.78962 12.2569 5.78029 12.4042C5.77097 12.5515 5.70408 12.6893 5.59408 12.7878C5.48408 12.8862 5.33978 12.9375 5.19231 12.9305C5.04484 12.9236 4.90602 12.8589 4.80582 12.7504C3.88233 11.7196 3.37166 10.3843 3.37166 9.00033C3.37166 7.61634 3.88233 6.28102 4.80582 5.25021C4.90531 5.13879 5.04498 5.07145 5.19412 5.06301C5.34325 5.05457 5.48963 5.10572 5.60105 5.20521C5.71248 5.3047 5.77981 5.44437 5.78825 5.59351C5.79669 5.74265 5.74554 5.88902 5.64605 6.00045C5.31418 6.36965 5.04592 6.7914 4.85223 7.24849ZM17.4382 8.99998C17.4416 11.209 16.5755 13.3306 15.0271 14.9062C14.9759 14.961 14.9143 15.005 14.8458 15.0356C14.7773 15.0661 14.7034 15.0827 14.6285 15.0844C14.5535 15.086 14.479 15.0726 14.4092 15.045C14.3395 15.0174 14.276 14.9761 14.2225 14.9236C14.1689 14.8711 14.1264 14.8084 14.0975 14.7392C14.0685 14.6701 14.0537 14.5958 14.0538 14.5208C14.054 14.4458 14.0691 14.3716 14.0984 14.3026C14.1277 14.2335 14.1704 14.171 14.2242 14.1187C15.5649 12.7528 16.3159 10.9153 16.3159 9.00138C16.3159 7.08745 15.5649 5.24996 14.2242 3.88404C14.1194 3.77756 14.0612 3.63381 14.0624 3.48441C14.0635 3.33501 14.124 3.1922 14.2305 3.0874C14.337 2.9826 14.4807 2.92439 14.6301 2.92557C14.7795 2.92676 14.9223 2.98725 15.0271 3.09373C16.5755 4.66931 17.4416 6.79095 17.4382 8.99998ZM3.77715 14.1173C3.82895 14.17 3.86986 14.2325 3.89754 14.301C3.92522 14.3695 3.93913 14.4428 3.93848 14.5167C3.93782 14.5907 3.92262 14.6637 3.89373 14.7317C3.86484 14.7998 3.82284 14.8615 3.77012 14.9133C3.71739 14.9651 3.65498 15.006 3.58645 15.0336C3.51792 15.0613 3.4446 15.0752 3.37069 15.0746C3.29678 15.0739 3.22372 15.0587 3.15569 15.0298C3.08766 15.001 3.02598 14.959 2.97418 14.9062C1.42603 13.3302 0.558594 11.2092 0.558594 8.99998C0.558594 6.79073 1.42603 4.6698 2.97418 3.09373C3.0254 3.03896 3.08706 2.99499 3.15553 2.9644C3.224 2.93381 3.29789 2.91721 3.37286 2.9156C3.44783 2.91398 3.52237 2.92737 3.59209 2.95498C3.66182 2.98259 3.72531 3.02386 3.77885 3.07637C3.83239 3.12888 3.87489 3.19156 3.90385 3.26073C3.93281 3.3299 3.94765 3.40417 3.94749 3.47916C3.94733 3.55415 3.93218 3.62835 3.90293 3.6974C3.87367 3.76644 3.83091 3.82895 3.77715 3.88123C2.43647 5.24714 1.68538 7.08464 1.68538 8.99857C1.68538 10.9125 2.43647 12.75 3.77715 14.1159V14.1173Z"
                        fill="white"
                      />
                    </svg>
                    Listen on
                  </p>
                  <div className="ped-platform-icons">
                    {podUrl && (
                      <PlatformIcon
                        url={podUrl}
                        target={podTarget}
                        title={episode.podcastLink?.podLink?.title}
                        type="pod"
                      />
                    )}
                    {spotifyUrl && (
                      <PlatformIcon
                        url={spotifyUrl}
                        target={spotifyTarget}
                        title={episode.podcastLink?.spotifyPodcast?.title}
                        type="spotify"
                      />
                    )}
                    {appleUrl && (
                      <PlatformIcon
                        url={appleUrl}
                        target={appleTarget}
                        title={episode.podcastLink?.applePodcasts?.title}
                        type="apple"
                      />
                    )}
                    {rssUrl && (
                      <PlatformIcon
                        url={rssUrl}
                        target={rssTarget}
                        title={episode.podcastLink?.rssFeed?.title}
                        type="rss"
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="ped-share-wrap" ref={sharePanelRef}>
                <button
                  className="ped-share-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShareOpen((o) => !o);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Share this podcast
                </button>
                {shareOpen && (
                  <div
                    className="ped-share-panel"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      className="ped-share-icon-btn ped-share-icon-btn--linkedin"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on LinkedIn"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a
                      className="ped-share-icon-btn ped-share-icon-btn--twitter"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(episode.title || "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on X"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <button
                      className={`ped-share-icon-btn ped-share-icon-btn--copy${copyMessage ? " ped-share-icon-btn--copied" : ""}`}
                      onClick={handleCopy}
                      title="Copy link"
                    >
                      {copyMessage ? (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="10" fill="#22c55e" />
                          <path
                            d="M7 12.5l3.5 3.5 6.5-7"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Season episodes carousel */}
          {relatedEpisodes.length > 0 && (
            <section className="ped-season">
              <h2 className="ped-season-title">People also listened to</h2>
              <div className="ped-season-grid">
                {visibleEpisodes.map((ep) => {
                  const epImg = ep.featuredImage?.node?.localFile?.publicURL;
                  return (
                    <div key={ep.slug} className="ped-season-card">
                      <Link href={ep.link} className="ped-season-card-img-wrap">
                        {epImg ? (
                          <img
                            src={epImg}
                            alt={ep.displayTitle}
                            className="ped-season-card-img"
                          />
                        ) : (
                          <div className="ped-season-card-img ped-season-card-img--placeholder" />
                        )}
                      </Link>
                      <div className="ped-season-card-meta">
                        {ep.date && (
                          <span className="ped-season-card-date">
                            {ep.date}
                          </span>
                        )}
                        {ep.episodeBadge && (
                          <span className="ped-season-card-badge">
                            {ep.episodeBadge}
                          </span>
                        )}
                        <Link href={ep.link} className="ped-season-card-title">
                          {ep.displayTitle}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="ped-season-dots">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      className={`ped-season-dot${i === page ? " ped-season-dot--active" : ""}`}
                      onClick={() => setPage(i)}
                      aria-label={`Page ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <CtaIntrigued />
    </>
  );
}

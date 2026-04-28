"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

import { GatsbyImage } from "@/components/compat/GatsbyImage";
import StaticImage from "@/components/compat/StaticImage";
import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import { CtaIntrigued } from "@/components/cta";

const ITEMS_PER_PAGE = 5;

function stripHtml(html: string) {
  let txt = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return txt.length > 250 ? txt.slice(0, 250) + "…" : txt;
}

/** WP `uri` may be `/slug/` or `/case-studies/slug/` depending on permalink rules. */
function caseStudyPermalink(link: string) {
  if (!link) return "/case-studies/";
  if (link.startsWith("/case-studies")) return link;
  return `/case-studies${link.startsWith("/") ? "" : "/"}${link}`;
}

type CaseStudiesViewProps = {
  data: {
    caseStudiesPage?: {
      nodes?: {
        metadata?: { metaTitle?: string; metaDescription?: string };
        featuredCaseStudyImage?: {
          node?: { localFile?: { publicURL?: string } };
        } | null;
        themePicker?: { themePicker?: string };
        caseStudyHero?: {
          caseStudyHeroTitle?: string;
          caseStudyHeroDescription?: string;
        };
      }[];
    };
    allCaseStudies?: { edges?: { post: PostLike }[] };
    latestCaseStudy?: { edges?: { node: PostLike }[] };
    allCaseStudyCategory?: { nodes?: { name?: string }[] };
  };
};

type PostLike = {
  id?: string;
  link: string;
  title?: string;
  excerpt?: string;
  date?: string;
  author?: unknown;
  categories: { nodes: { name?: string; link?: string; uri?: string }[] };
  featuredImage?: {
    node?: {
      localFile?: {
        publicURL?: string;
        childImageSharp?: { gatsbyImageData?: unknown };
      };
      childImageSharp?: { gatsbyImageData?: unknown };
    };
  } | null;
};

const Hero = ({
  data,
}: {
  data: {
    caseStudyHeroTitle?: string;
    caseStudyHeroDescription?: string;
  };
}) => (
  <div className="hero hero-title-section glow-bg section case-studies-hero">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1
          className="hero-title title-inline"
          dangerouslySetInnerHTML={{ __html: data.caseStudyHeroTitle || "" }}
        />
        <p className="hero-description p1">{data.caseStudyHeroDescription}</p>
      </div>
    </div>
  </div>
);

function gatsbyImgData(post: PostLike) {
  const n = post.featuredImage?.node;
  if (!n) return null;
  return (
    n.localFile?.childImageSharp?.gatsbyImageData ||
    (n as { childImageSharp?: { gatsbyImageData?: unknown } }).childImageSharp
      ?.gatsbyImageData
  );
}

export default function CaseStudiesView({ data }: CaseStudiesViewProps) {
  const csNode = data?.caseStudiesPage?.nodes?.[0];
  const metadata = csNode?.metadata;
  const themePicker = csNode?.themePicker;
  const heroData = csNode?.caseStudyHero
    ? {
        caseStudyHeroTitle: csNode.caseStudyHero.caseStudyHeroTitle,
        caseStudyHeroDescription: csNode.caseStudyHero.caseStudyHeroDescription,
      }
    : {
        caseStudyHeroTitle: "Case studies",
        caseStudyHeroDescription: "",
      };

  const metaImage = csNode?.featuredCaseStudyImage?.node?.localFile?.publicURL;

  const listRef = useRef<HTMLDivElement>(null);
  const pool = data?.allCaseStudies?.edges?.map((edge) => edge.post) ?? [];
  const [page, setPage] = useState(1);

  function goToPage(n: number) {
    setPage(n);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const totalPages = Math.max(1, Math.ceil(pool.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visiblePosts = pool.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <BodyClass className={`dark ${themePicker?.themePicker ?? ""}`} />
      <Seo
        title={metadata?.metaTitle}
        description={metadata?.metaDescription}
        image={metaImage}
      />
      <Hero data={heroData} />
      <div className="resources section ml-margins">
        <div className="container">
          <div className="blog-content">
            <div id="case-studies-results" className="case-studies-list" ref={listRef}>
              {visiblePosts.map((post) => {
                const imgData = gatsbyImgData(post);
                return (
                  <article
                    className="case-studies-list-item"
                    key={post.id ?? post.link}
                  >
                    <Link
                      href={caseStudyPermalink(post.link)}
                      className="case-studies-list-item-image"
                      aria-label={post.title || "Case study"}
                    >
                      <div className="case-studies-list-item-image-inner">
                        {imgData ? (
                          <GatsbyImage image={imgData} alt={post.title || ""} />
                        ) : (
                          <StaticImage
                            src="../assets/img/ogimg.png"
                            alt={post.title || ""}
                            aspectRatio={1.34}
                          />
                        )}
                      </div>
                    </Link>
                    <div className="case-studies-list-item-content">
                      <Link
                        href={caseStudyPermalink(post.link)}
                        className="case-studies-list-item-title"
                      >
                        <h5>{post.title}</h5>
                      </Link>
                      {post.excerpt ? (
                        <p className="case-studies-list-item-excerpt">
                          {stripHtml(post.excerpt)}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav className="case-studies-pagination" aria-label="Pagination">
                <button
                  className="case-studies-pagination-arrow"
                  onClick={() => goToPage(Math.max(1, safePage - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`case-studies-pagination-page${safePage === n ? " active" : ""}`}
                    onClick={() => goToPage(n)}
                    aria-label={`Page ${n}`}
                    aria-current={safePage === n ? "page" : undefined}
                  >
                    {n}
                  </button>
                ))}
                <button
                  className="case-studies-pagination-arrow"
                  onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                >
                  ›
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
      <CtaIntrigued />
    </>
  );
}

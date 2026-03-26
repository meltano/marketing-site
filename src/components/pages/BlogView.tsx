"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { GatsbyImage } from "@/components/compat/GatsbyImage";
import StaticImage from "@/components/compat/StaticImage";
import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import { CtaIntrigued } from "@/components/cta";
import SearchBar from "@/components/search";
import MailingListBanner from "@/components/mailingListBanner";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function wpAuthor(author: unknown) {
  return author as { node?: { name?: string; avatar?: { url?: string } } } | undefined;
}

type BlogViewProps = {
  data: {
    blog: {
      nodes: {
        metadata?: { metaTitle?: string; metaDescription?: string };
        featuredBlogImage?:
          | {
              node?: { localFile?: { publicURL?: string } };
            }
          | null;
        themePicker?: { themePicker?: string };
        blogHero?: { blogHeroTitle?: string; blogHeroDescription?: string };
      }[];
    };
    allWpPost: {
      edges: {
        post: {
          id?: string;
          link: string;
          title?: string;
          excerpt?: string;
          author?: unknown;
          categories: { nodes: { name?: string; link?: string; uri?: string }[] };
          featuredImage?:
            | {
                node?: {
                  localFile?: {
                    publicURL?: string;
                    childImageSharp?: { gatsbyImageData?: unknown };
                  };
                  childImageSharp?: { gatsbyImageData?: unknown };
                };
              }
            | null;
        };
      }[];
    };
    latestPost: {
      edges: {
        node: {
          id?: string;
          link: string;
          title?: string;
          excerpt?: string;
          date?: string;
          categories: { nodes: { name?: string; link?: string; uri?: string }[] };
          author?: unknown;
          featuredImage?:
            | {
                node?: {
                  localFile?: {
                    publicURL?: string;
                    childImageSharp?: { gatsbyImageData?: unknown };
                  };
                  childImageSharp?: { gatsbyImageData?: unknown };
                };
              }
            | null;
        };
      }[];
    };
    allWpCategory: { nodes: { name?: string }[] };
  };
};

const Hero = ({
  data,
}: {
  data: { blogHeroTitle?: string; blogHeroDescription?: string };
}) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1
          className="hero-title title-inline"
          dangerouslySetInnerHTML={{ __html: data.blogHeroTitle || "" }}
        />
        <p className="hero-description p1">{data.blogHeroDescription}</p>
      </div>
    </div>
  </div>
);

function gatsbyImgData(post: BlogViewProps["data"]["allWpPost"]["edges"][0]["post"]) {
  const n = post.featuredImage?.node;
  if (!n) return null;
  return (
    n.localFile?.childImageSharp?.gatsbyImageData ||
    (n as { childImageSharp?: { gatsbyImageData?: unknown } }).childImageSharp
      ?.gatsbyImageData
  );
}

export default function BlogView({ data }: BlogViewProps) {
  const router = useRouter();
  const { metadata, featuredBlogImage, themePicker, blogHero } = data.blog.nodes[0];
  const metaImage = featuredBlogImage?.node?.localFile?.publicURL;

  const posts = data.allWpPost.edges.map((edge) => edge.post);
  const latestPost = data.latestPost.edges[0]?.node;
  const allCategories = data.allWpCategory.nodes;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [numPosts, setNumPosts] = useState(9);

  const qFromUrl =
    typeof router.query.s === "string" ? router.query.s : "";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(qFromUrl || "");
  }, [qFromUrl]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category === "show all" ? null : category);
    setNumPosts(9);
  };

  const handleLoadMoreClick = () => {
    setNumPosts((n) => n + 9);
  };

  const pool = useMemo(() => {
    let base = posts.filter((p) => p.id !== latestPost?.id);
    if (selectedCategory) {
      base = base.filter((p) =>
        p.categories.nodes.some((c) => c.name === selectedCategory)
      );
    }
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter((p) => {
      const text = `${p.title} ${stripHtml(p.excerpt || "")}`.toLowerCase();
      return text.includes(q);
    });
  }, [posts, selectedCategory, latestPost?.id, searchQuery]);

  const visiblePosts = pool.slice(0, numPosts);

  return (
    <>
      <BodyClass className={`dark ${themePicker?.themePicker ?? ""}`} />
      <Seo
        title={metadata?.metaTitle}
        description={metadata?.metaDescription}
        image={metaImage}
      />
      <Hero data={blogHero || {}} />
      <div className="resources section ml-margins">
        <div className="container">
          {latestPost ? (
            <div className="spotlight">
              <div
                className="spotlight-item"
                style={{
                  backgroundImage: `url(${
                    latestPost.featuredImage?.node?.localFile?.publicURL ||
                    metaImage ||
                    ""
                  })`,
                }}
              >
                <div className="spotlight-info">
                  <div className="spotlight-item-heading">
                    <div className="spotlight-tags">
                      {latestPost.categories.nodes.map((cat) => (
                        <span key={cat.link ?? cat.name}>
                          <p className="spotlight-tag" key={cat.name}>
                            {cat.name}
                          </p>
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog${latestPost.link}`}
                      className="spotlight-title"
                    >
                      <h3>{latestPost.title}</h3>
                    </Link>
                    <p
                      className="p2 spotlight-description"
                      dangerouslySetInnerHTML={{
                        __html: latestPost.excerpt || "",
                      }}
                    />
                  </div>
                  <div className="spotlight-metadata">
                    <img
                      className="spotlight-author-image"
                      src={wpAuthor(latestPost.author)?.node?.avatar?.url || ""}
                      alt={wpAuthor(latestPost.author)?.node?.name || ""}
                    />
                    <div className="spotlight-metadata-info">
                      <p className="spotlight-author-name">
                        by{" "}
                        <span className="bold">
                          {wpAuthor(latestPost.author)?.node?.name}
                        </span>
                      </p>
                      <p className="spotlight-author-date">
                        on <span className="bold">{latestPost.date}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="blog-content">
            <div className="blog-filters">
              <div className="blog-filters-title">
                <h5>Filter by topic</h5>
              </div>

              <div className="blog-dropdown">
                <select
                  id="blog-filters"
                  value={selectedCategory || "show all"}
                  onChange={handleCategoryChange}
                >
                  <option value="show all">Show All</option>
                  {allCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="blog-search">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            </div>
            <div id="blog-results" className="blog-content-grid">
              {visiblePosts.map((post) => {
                const imgData = gatsbyImgData(post);
                return (
                  <div className="blog-content-grid-item" key={post.id}>
                    <div className="blog-content-grid-item-image">
                      <div className="blog-tags">
                        {post.categories.nodes.map((cat) => (
                          <span key={cat.link ?? cat.name}>
                            <p className="blog-tag">{cat.name}</p>
                          </span>
                        ))}
                      </div>
                      <Link href={`/blog${post.link}`}>
                        {imgData ? (
                          <GatsbyImage image={imgData} alt={post.title || ""} />
                        ) : (
                          <StaticImage
                            src="../assets/img/ogimg.png"
                            alt={post.title || ""}
                            aspectRatio={1.34}
                          />
                        )}
                      </Link>
                    </div>
                    <Link href={`/blog${post.link}`}>
                      <h5>{post.title}</h5>
                    </Link>
                  </div>
                );
              })}
            </div>

            {visiblePosts.length < pool.length ? (
              <button
                id="load-more-button"
                className="btn alt-blue-btn middle"
                type="button"
                onClick={handleLoadMoreClick}
              >
                Load more
              </button>
            ) : null}
          </div>
          <MailingListBanner />
        </div>
      </div>
      <CtaIntrigued />
    </>
  );
}

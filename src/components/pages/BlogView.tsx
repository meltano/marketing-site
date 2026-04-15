"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import StaticImage from "@/components/compat/StaticImage";
import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import { CtaIntrigued } from "@/components/cta";
import SearchBar from "@/components/search";
import MailingListBanner from "@/components/mailingListBanner";

function stripHtml(html: string) {
  let txt = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return txt.length > 300 ? txt.slice(0, 300) + "…" : txt;
}

type BlogViewProps = {
  data: {
    blog: {
      nodes: {
        metadata?: { metaTitle?: string; metaDescription?: string };
        featuredBlogImage?: {
          node?: { localFile?: { publicURL?: string } };
        } | null;
        posts?: { shortDescription?: string | null; longDescription?: string | null };
        themePicker?: { themePicker?: string };
        blogHero?: { blogHeroTitle?: string; blogHeroDescription?: string; blogHeroSubDescription?: string };
      }[];
    };
    allWpPost: {
      edges: {
        post: {
          id?: string;
          link: string;
          title?: string;
          excerpt?: string;
          shortDescription?: string | null;
          longDescription?: string | null;
          date?: string;
          author?: unknown;
          categories: {
            nodes: { name?: string; link?: string; uri?: string }[];
          };
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
      }[];
    };
    latestPost: {
      edges: {
        node: {
          id?: string;
          link: string;
          title?: string;
          excerpt?: string;
          posts?: { shortDescription?: string | null; longDescription?: string | null };
          date?: string;
          categories: {
            nodes: { name?: string; link?: string; uri?: string }[];
          };
          author?: unknown;
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
      }[];
    };
    allWpCategory: { nodes: { name?: string }[] };
  };
};

const Hero = ({
  data,
}: {
  data: {
    blogHeroTitle?: string;
    blogHeroDescription?: string;
    blogHeroSubDescription?: string;
  };
}) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1
          className="hero-title title-inline"
          dangerouslySetInnerHTML={{ __html: data.blogHeroTitle || "" }}
        />
        <p className="hero-description p1 ">
          <span>{data.blogHeroDescription}</span>
          <span>{data.blogHeroSubDescription}</span>
        </p>
      </div>
    </div>
  </div>
);

export default function BlogView({ data }: BlogViewProps) {
  const router = useRouter();
  const { metadata, featuredBlogImage, themePicker, blogHero } =
    data.blog.nodes[0];
  const metaImage = featuredBlogImage?.node?.localFile?.publicURL;

  const posts = data.allWpPost.edges.map((edge) => edge.post);
  const allCategories = data.allWpCategory.nodes;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [numPosts, setNumPosts] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  // Guard: don't write to URL before we've read from it (avoids wiping params on first render)
  const initialized = useRef(false);
  // Always-current values for use inside debounce callbacks (avoids stale closures)
  const stateRef = useRef({ searchQuery: "", selectedCategory: null as string | null, numPosts: 9 });
  stateRef.current = { searchQuery, selectedCategory, numPosts };

  // Restore filter state from URL on mount — this is what makes back-navigation work
  useEffect(() => {
    if (!router.isReady || initialized.current) return;
    initialized.current = true;

    const q = typeof router.query.s === "string" ? router.query.s : "";
    const cat = typeof router.query.category === "string" ? router.query.category : null;
    const p = typeof router.query.posts === "string" ? parseInt(router.query.posts, 10) : NaN;

    setSearchQuery(q);
    setSelectedCategory(cat);
    if (!isNaN(p) && p > 0) setNumPosts(p);
  }, [router.isReady, router.query]);

  // Write filter state to URL without reloading the page so the browser history preserves it
  const pushToUrl = (s: string, category: string | null, posts: number) => {
    const query: Record<string, string> = {};
    if (s) query.s = s;
    if (category) query.category = category;
    if (posts > 9) query.posts = String(posts);
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value === "show all" ? null : e.target.value;
    setSelectedCategory(category);
    setNumPosts(9);
    pushToUrl(searchQuery, category, 9);
  };

  const handleLoadMoreClick = () => {
    const n = numPosts + 9;
    setNumPosts(n);
    pushToUrl(searchQuery, selectedCategory, n);
  };

  // Debounce search → URL: waits 500 ms after the user stops typing before updating the URL
  useEffect(() => {
    if (!initialized.current) return;
    const t = setTimeout(() => {
      const { searchQuery: s, selectedCategory: cat, numPosts: posts } = stateRef.current;
      pushToUrl(s, cat, posts);
    }, 500);
    return () => clearTimeout(t);
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const pool = useMemo(() => {
    let base = posts;
    if (selectedCategory) {
      base = base.filter((p) =>
        p.categories.nodes.some((c) => c.name === selectedCategory),
      );
    }
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter((p) => {
      const text = `${p.title} ${stripHtml(p.excerpt || "")}`.toLowerCase();
      return text.includes(q);
    });
  }, [posts, selectedCategory, searchQuery]);

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

              <div className={`blog-search${searchQuery ? ' blog-search--active' : ''}`}>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                {searchQuery && (
                  <button
                    className="blog-search__clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    &#x2715;
                  </button>
                )}
              </div>
            </div>

            <div id="blog-results" className="blog-list">
              {visiblePosts.map((post, index) => {
                const imgUrl = post.featuredImage?.node?.localFile?.publicURL;
                const isFeatured = index === 0;
                return (
                  <React.Fragment key={post.id ?? post.link}>
                    {index > 0 && <div className="blog-list-divider" />}
                    <article
                      className={`blog-list-item${isFeatured ? " featured" : ""}`}
                    >
                      <Link
                        href={`/blog${post.link}`}
                        className="blog-list-item-image"
                        rel="canonical"
                        aria-label={post.title || "Read post"}
                      >
                        {imgUrl ? (
                          <img src={imgUrl} alt={post.title || ""} />
                        ) : (
                          <StaticImage
                            src="../assets/img/ogimg.png"
                            alt={post.title || ""}
                            aspectRatio={1.34}
                          />
                        )}
                      </Link>

                      <div className="blog-list-item-content">
                        <div className="blog-list-item-text">
                          {post.date && (
                            <p className="blog-list-item-date">{post.date}</p>
                          )}
                          <Link href={`/blog${post.link}`} rel="canonical">
                            <h5 className="blog-list-item-title">
                              {post.title}
                            </h5>
                          </Link>
                          {post.excerpt && (
                            <p className="blog-list-item-excerpt">
                              {stripHtml(post?.shortDescription || "")}
                            </p>
                          )}
                        </div>
                        <Link
                          href={`/blog${post.link}`}
                          className="blog-list-read-more"
                          rel="canonical"
                        >
                          Read more
                        </Link>
                      </div>
                    </article>
                  </React.Fragment>
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

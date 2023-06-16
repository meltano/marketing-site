import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'

import { Helmet } from 'react-helmet'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { CtaIntrigued } from '../components/cta'
import SearchBar from '../components/search'
import MailingListBanner from '../components/mailingListBanner'

const Hero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1
          className="hero-title title-inline"
          dangerouslySetInnerHTML={{ __html: data.blogHeroTitle }}
        />
        <p className="hero-description p1">{data.blogHeroDescription}</p>
      </div>
    </div>
  </div>
)

const Blog = ({ data, location }) => {
  const { metadata, featuredBlogImage, themePicker, blogHero } =
    data.blog.nodes[0]
  const metaImage = featuredBlogImage?.node.localFile.publicURL

  const posts = data.allWpPost.edges.map(edge => edge.post)
  const latestPost = data.latestPost.edges[0].node
  const allCategories = data.allWpCategory.nodes

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [numPosts, setNumPosts] = useState(9)

  const handleCategoryChange = e => {
    const category = e.target.value
    setSelectedCategory(category === 'show all' ? null : category)
    setNumPosts(9)
  }

  const handleLoadMoreClick = () => {
    setNumPosts(numPosts + 9)
  }

  const unFlattenResults = result =>
    result.map(post => {
      const { date, slug, link, categories, title, id } = post
      return { date, slug, link, categories, title, id }
    })

  const { index } = data.localSearchPages
  const { store } = data.localSearchPages

  const { search } = location
  const query = new URLSearchParams(search).get('s')
  const [searchQuery, setSearchQuery] = useState(query || '')

  const results = useFlexSearch(searchQuery, index, store)

  const postsSearch = selectedCategory
    ? unFlattenResults(results)
        .filter(post => post.id !== latestPost.id)
        .filter(post =>
          post.categories.nodes.some(
            category => category.name === selectedCategory
          )
        )
    : unFlattenResults(results).filter(post => post.id !== latestPost.id)

  const filteredPosts = selectedCategory
    ? posts
        .filter(post => post.id !== latestPost.id)
        .filter(post =>
          post.categories.nodes.some(
            category => category.name === selectedCategory
          )
        )
    : posts.filter(post => post.id !== latestPost.id)

  const visiblePosts =
    searchQuery.length === 0
      ? filteredPosts.slice(0, numPosts)
      : postsSearch.slice(0, numPosts)

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: `dark ${themePicker.themePicker}`,
        }}
      />
      <Seo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        image={metaImage}
      />
      <Hero data={blogHero} />
      <div className="resources section ml-margins">
        <div className="container">
          <div className="spotlight">
            <div
              className="spotlight-item"
              style={{
                backgroundImage: `url(${
                  latestPost.featuredImage?.node.localFile.publicURL ||
                  metaImage
                })`,
              }}
            >
              <div className="spotlight-info">
                <div className="spotlight-item-heading">
                  <div className="spotlight-tags">
                    {latestPost.categories.nodes.map(cat => (
                      <span to={cat.link} key={cat.link}>
                        <p className="spotlight-tag" key={cat.name}>
                          {cat.name}
                        </p>
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog${latestPost.link}`}
                    className="spotlight-title"
                  >
                    <h3>{latestPost.title}</h3>
                  </Link>
                  <p
                    className="p2 spotlight-description"
                    dangerouslySetInnerHTML={{
                      __html: latestPost.excerpt,
                    }}
                  />
                </div>
                <div className="spotlight-metadata">
                  <img
                    className="spotlight-author-image"
                    src={latestPost.author.node.avatar.url}
                    alt={latestPost.author.node.name}
                  />
                  <div className="spotlight-metadata-info">
                    <p className="spotlight-author-name">
                      by{' '}
                      <span className="bold">
                        {latestPost.author.node.name}
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

          <div className="blog-content">
            <div className="blog-filters">
              <div className="blog-filters-title">
                <h5>Filter by topic</h5>
              </div>

              <div className="blog-dropdown">
                <select
                  id="blog-filters"
                  value={selectedCategory || 'show all'}
                  onChange={handleCategoryChange}
                >
                  <option value="show all">Show All</option>
                  {allCategories.map(category => (
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
              {visiblePosts.map(post => (
                <div className="blog-content-grid-item" key={post.id}>
                  <div className="blog-content-grid-item-image">
                    <div className="blog-tags">
                      {post.categories.nodes.map(cat => (
                        <span to={cat.link} key={cat.link}>
                          <p className="blog-tag">{cat.name}</p>
                        </span>
                      ))}
                    </div>
                    <Link to={`/blog${post.link}`}>
                      {post.featuredImage ? (
                        <GatsbyImage
                          image={
                            post.featuredImage.node.localFile.childImageSharp
                              .gatsbyImageData
                          }
                          alt={post.title}
                        />
                      ) : (
                        <StaticImage
                          src="../assets/img/ogimg.png"
                          alt={post.title}
                          aspectRatio={1.34}
                        />
                      )}
                    </Link>
                  </div>
                  <Link to={`/blog${post.link}`}>
                    <h5>{post.title}</h5>
                  </Link>
                </div>
              ))}
            </div>

            {((searchQuery.length === 0 &&
              visiblePosts.length < filteredPosts.length) ||
              (searchQuery.length !== 0 &&
                visiblePosts.length < postsSearch.length)) && (
              <button
                id="load-more-button"
                className="btn alt-blue-btn middle"
                type="button"
                onClick={handleLoadMoreClick}
              >
                Load more
              </button>
            )}
          </div>
          <MailingListBanner />
        </div>
      </div>
      <CtaIntrigued />
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    blog: allWpPage(filter: { title: { eq: "Blog" } }) {
      nodes {
        title
        metadata {
          metaTitle
          metaDescription
        }
        featuredBlogImage: featuredImage {
          node {
            localFile {
              publicURL
            }
          }
        }
        themePicker {
          themePicker
        }
        blogHero {
          blogHeroTitle
          blogHeroDescription
        }
      }
    }
    localSearchPages {
      index
      store
    }
    latestPost: allWpPost(
      sort: { date: DESC }
      filter: { status: { eq: "publish" } }
      limit: 1
    ) {
      edges {
        node {
          id
          link
          title
          categories {
            nodes {
              name
              link
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          date(formatString: "MMMM DD YYYY")
          excerpt
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(aspectRatio: 1.34)
                }
                publicURL
              }
            }
          }
        }
      }
    }
    allWpPost(sort: { date: DESC }, filter: { status: { eq: "publish" } }) {
      edges {
        post: node {
          id
          link
          title
          categories {
            nodes {
              name
              link
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          date(formatString: "MM/DD/YYYY")
          excerpt
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(aspectRatio: 1.34)
                }
                publicURL
              }
            }
          }
        }
      }
    }
    allWpCategory(filter: { name: { ne: "Uncategorized" } }) {
      nodes {
        name
      }
    }
  }
`

import React, { useState, useEffect, useRef } from 'react'
import { Highlight, Prism, themes } from 'prism-react-renderer'
import { Link, graphql } from 'gatsby'
import parse, { domToReact } from 'html-react-parser'

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import '../styles/@wordpress/block-library/build-style/style.css'
import '../styles/@wordpress/block-library/build-style/theme.css'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { CtaIntrigued } from '../components/cta'

function separateTOCFromContent(content) {
  const divIndex = content.indexOf(`<div id="ez-toc-container"`)
  if (divIndex !== -1) {
    const divEndIndex = content.indexOf('</div>', divIndex) + 6
    if (divEndIndex !== -1) {
      const divContent = content.substring(divIndex, divEndIndex)
      const remainingContent = content.replace(divContent, '')
      return [remainingContent, divContent]
    }
  }
  return [content, '']
}

const HighlightedCode = ({ code }) => {
  const lines = code.split('\n')
  const codeLines = lines.slice(2).join('\n')

  return (
    <div className="tab-terminal">
      <div className="terminal-header">
        <div className="terminal-header-circles">
          <span className="red-bg" />
          <span className="yellow-bg" />
          <span className="green-bg" />
        </div>
        <span className="tab-terminal-title">{lines[0]}</span>
        <span className="terminal-circle-clear terminal-circle-blue" />
      </div>
      <div className="terminal-content">
        <Highlight
          theme={themes.oceanicNext}
          code={codeLines}
          language={lines[1]}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

const terminalOptions = {
  replace: ({ attribs, children }) => {
    if (!attribs) {
      return
    }

    if (attribs.class === 'wp-block-preformatted') {
      return <HighlightedCode code={domToReact(children, terminalOptions)} />
    }
  },
}

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.publicURL,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = window.sessionStorage.getItem('theme')
      return savedTheme || 'dark'
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('theme', theme)
    }
  }, [theme])

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const [remainingContent, divContent] = separateTOCFromContent(post.content)

  const startIndex = divContent.indexOf('<ul')
  const toc = divContent.substring(startIndex).slice(0, -12)

  const [isOpen, setIsOpen] = useState(true)
  const tocContentRef = useRef(null)

  useEffect(() => {
    if (tocContentRef.current) {
      const tocContent = tocContentRef.current
      tocContent.style.transition = 'max-height 0.1s ease-out'
    }
  }, [])

  const toggleTOC = () => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: `single-blog ${
            theme === 'light'
              ? 'light-blog light-header light-footer'
              : 'dark-blog dark-header dark-footer'
          }`,
        }}
      />
      <Seo
        title={post.title}
        description={post.excerpt}
        image={featuredImage.data}
      />

      <div className="blog-single ml-margins">
        <div className={`container${divContent ? '' : '-narrow '}`}>
          <div className={`${divContent ? 'container-subnarrow' : ''}`}>
            <label className="light-dark-toggle">
              <input
                className="toggle-checkbox"
                type="checkbox"
                checked={theme === 'light'}
                onClick={handleThemeChange}
                readOnly
              />
              <div className="toggle-slot">
                <div className="sun-icon-wrapper">
                  <svg
                    className="sun-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <line
                      x1="9.66602"
                      y1="20.0002"
                      x2="9.66602"
                      y2="16.0002"
                      stroke="#080216"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                    />
                    <line
                      x1="9.66504"
                      y1="4.00024"
                      x2="9.66504"
                      y2="0.000244053"
                      stroke="#080216"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                    />
                    <line
                      x1="-0.000976316"
                      y1="9.66699"
                      x2="3.99902"
                      y2="9.66699"
                      stroke="#080216"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                    />
                    <line
                      x1="15.998"
                      y1="9.66675"
                      x2="19.998"
                      y2="9.66675"
                      stroke="#080216"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                    />
                    <line
                      x1="3.13078"
                      y1="16.6264"
                      x2="5.95921"
                      y2="13.798"
                      stroke="#080216"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                    />
                    <line
                      x1="13.7968"
                      y1="5.95964"
                      x2="16.6252"
                      y2="3.13121"
                      stroke="#080216"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                    />
                    <line
                      x1="3.21199"
                      y1="3.13054"
                      x2="6.04042"
                      y2="5.95897"
                      stroke="#080216"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                    />
                    <line
                      x1="13.878"
                      y1="13.7975"
                      x2="16.7064"
                      y2="16.626"
                      stroke="#080216"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                    />
                    <circle
                      opacity="0.5"
                      cx="9.99805"
                      cy="10.0005"
                      r="4"
                      transform="rotate(-180 9.99805 10.0005)"
                      fill="#080216"
                    />
                  </svg>
                </div>
                <div className="toggle-button" />
                <div className="moon-icon-wrapper">
                  <svg
                    className="moon-icon"
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.14848 0.548777C2.1512 1.58901 -0.00047206 4.43786 -0.000472353 7.78925C-0.000472723 12.0209 3.42999 15.4514 7.66169 15.4514C10.4116 15.4514 12.8231 14.0028 14.1748 11.8271C13.3875 12.1003 12.5419 12.2488 11.6616 12.2488C7.4299 12.2488 3.99943 8.81831 3.99943 4.58662C3.99943 3.10479 4.42008 1.72121 5.14848 0.548777Z"
                      fill="#080216"
                      fillOpacity="0.5"
                    />
                  </svg>
                </div>
              </div>
            </label>

            <h1>{post.title}</h1>
            <div
              className="blog-featured-image"
              style={{
                backgroundImage: `url(${featuredImage.data})`,
              }}
            />
          </div>
          <div className="blog-metadata">
            <div className="blog-metadata-tags">
              {post.categories.nodes.map(cat => (
                <span key={cat.link}>
                  <p className="blog-metadata-tag">{cat.name}</p>
                </span>
              ))}
            </div>
            <div className="blog-metadata-author">
              <img
                className="blog-author-image"
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
              />
              <div className="blog-metadata-info">
                <p className="blog-author-name">
                  by <span className="bold">{post.author.node.name}</span>
                </p>
                <p className="blog-author-date">
                  on <span className="bold">{post.date}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={`${divContent ? 'blog-d-flex' : ''}`}>
            <div
              className={`${divContent ? 'container-narrow margin-unset' : ''}`}
            >
              <div>
                {!!post.content && (
                  <div className="blog-content" itemProp="articleBody">
                    {parse(remainingContent, terminalOptions)}
                  </div>
                )}
              </div>

              <CtaIntrigued />
            </div>
            {divContent && (
              <div className="toc-wrapper">
                <div className="container-small">
                  <div id="toc">
                    <div className="toc-header">
                      <h5>Table of contents</h5>
                      <button
                        type="button"
                        className={`toc-toggle ${
                          isOpen ? 'toc-opened' : 'toc-closed'
                        }`}
                        onClick={toggleTOC}
                      >
                        <span className="toc-label">Hide</span>
                        <svg
                          className="toc-toggle-arrow"
                          width="14"
                          height="9"
                          viewBox="0 0 14 9"
                          fill="none"
                        >
                          <path
                            d="M13 7.5L7 1.5L1 7.5"
                            stroke="white"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      className="toc-content"
                      style={{
                        maxHeight: isOpen ? `Calc(100vh - 515px)` : '0',
                      }}
                      ref={tocContentRef}
                    >
                      {parse(toc)}
                    </div>
                  </div>

                  <div className="mailing-list-widget">
                    <h5>Join our mailing list</h5>
                    <p>Stay current with all things Meltano</p>

                    <form className="mainling-list-widget-form">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                      <button type="submit" className="btn alt-blue-btn">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
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
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
            publicURL
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`

import React from 'react'
import Link from '@/components/compat/GatsbyLink'
import { GatsbyImage } from '@/components/compat/GatsbyImage'
const DEFAULT_OG = '/assets/img/ogimg.png'

const Related = ({ data, posts }) => {
  const stickyPosts = posts.edges.map(edge => edge.node)

  return (
    <div className="blog-content section">
      <div className="container">
        <div className="ml-margins">
          <div className="heading">
            <h2
              className="title-inline"
              dangerouslySetInnerHTML={{ __html: data.latestTitle }}
            />
          </div>
          <div className="blog-content-grid">
            {stickyPosts.map(post => (
              <div className="blog-content-grid-item" key={post.id}>
                <div className="blog-content-grid-item-image">
                  <div className="blog-tags">
                    {post.categories.nodes.map(cat => (
                      <span key={cat.link ?? cat.name}>
                        <p className="blog-tag">{cat.name}</p>
                      </span>
                    ))}
                  </div>
                  <Link to={`/blog${post.link}`}>
                    {post.featuredImage ? (
                      <GatsbyImage
                        image={
                          post.featuredImage.node.localFile?.childImageSharp
                            ?.gatsbyImageData ||
                            post.featuredImage.node.childImageSharp
                              ?.gatsbyImageData
                        }
                        alt={post.title}
                      />
                    ) : (
                      <img
                        src={DEFAULT_OG}
                        alt={post.title}
                        width={2400}
                        height={1260}
                        loading="lazy"
                        decoding="async"
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
          {/* <Link to={data.latestLink.url} className="btn colorful-btn">
            <span /> {data.latestLink.title}
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Related

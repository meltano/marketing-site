import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import MetaImage from '../assets/img/ogimg.png'

const Related = ({ data, posts }) => {
  const stickyPosts = posts.edges.map(edge => edge.node)

  return (
    <div className="blog-content section">
      <div className="container">
        <div className="heading">
          <h2
            className="title-inline"
            dangerouslySetInnerHTML={{ __html: data.latestTitle }}
          />
        </div>

        <div className="blog-content-grid ml-margins">
          {stickyPosts.map(post => (
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
                    <img src={MetaImage} alt={post.title} />
                  )}
                </Link>
              </div>
              <Link to={`/blog${post.link}`}>
                <h5>{post.title}</h5>
              </Link>
            </div>
          ))}
        </div>

        <Link to={data.latestLink.url} className="btn colorful-btn">
          <span /> {data.latestLink.title}
        </Link>
      </div>
    </div>
  )
}

export default Related

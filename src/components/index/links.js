import React from 'react'
import { Link } from 'gatsby'

const Links = ({ data }) => (
  <div className="paragraphs-with-links section">
    <div className="container">
      <div className="paragraphs-with-links-table ml-margins">
        {data.linksArray.map(link => (
          <div className="paragraphs-with-links-item" key={link.linksTitle}>
            <div className="paragraphs-with-links-item-info">
              <h4 dangerouslySetInnerHTML={{ __html: link.linksTitle }} />
              <p className="p2">{link.linksText}</p>
            </div>
            {link.linksLink.target.charAt(0) === '/' ? (
              <Link
                to={link.linksLink.url}
                target={link.linksLink.target}
                className="btn colorful-btn"
              >
                <span />
                {link.linksLink.title}
              </Link>
            ) : (
              <a
                href={link.linksLink.url}
                target={link.linksLink.target}
                className="btn colorful-btn"
              >
                <span />
                {link.linksLink.title}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Links

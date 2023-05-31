import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const Meet = ({ data }) => (
  <div className="data-partners section">
    <div className="container">
      <div className="data-partners-grid ml-margins">
        {data.partnersMeetGroup.map(group => (
          <div
            className="data-partners-grid-item"
            key={group.partnersMeetGroupLink.title}
          >
            <a
              href={group.partnersMeetGroupLink.url}
              target={group.partnersMeetGroupLink.target}
              rel="noopener noreferrer"
            >
              <GatsbyImage
                image={
                  group.partnersMeetGroupImage.localFile.childImageSharp
                    .gatsbyImageData
                }
                alt={group.partnersMeetGroupLink.title}
              />
              <p className="p3">{group.partnersMeetGroupLink.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Meet

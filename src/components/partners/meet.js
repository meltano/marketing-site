import React from 'react'
import { GatsbyImage } from '@/components/compat/GatsbyImage'

const asText = value => (typeof value === 'string' || typeof value === 'number' ? String(value) : '')

const Meet = ({ data }) => (
  <div className="data-partners section">
    <div className="container">
      <div className="data-partners-grid ml-margins">
        {(Array.isArray(data?.partnersMeetGroup) ? data.partnersMeetGroup : []).map((group, idx) => (
          <div
            className="data-partners-grid-item"
            key={`${asText(group?.partnersMeetGroupLink?.title)}-${idx}`}
          >
            <a
              href={asText(group?.partnersMeetGroupLink?.url) || '#'}
              target={asText(group?.partnersMeetGroupLink?.target) || '_self'}
              rel="noopener noreferrer"
            >
              <GatsbyImage
                image={
                  group?.partnersMeetGroupImage?.localFile?.childImageSharp
                    ?.gatsbyImageData
                }
                alt={asText(group?.partnersMeetGroupLink?.title)}
              />
              <p className="p3">{asText(group?.partnersMeetGroupLink?.title)}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Meet

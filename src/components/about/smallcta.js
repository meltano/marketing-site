import React from 'react'

const SmallCta = ({ data }) => (
  <div className="cta-small section">
    <div className="container">
      <p className="cta-info">{data.aboutSmallCtaTitle}</p>
      <a
        href={data.aboutSmallCtaLink.url}
        className="cta-link btn-with-arrow middle"
        target={data.aboutSmallCtaLink.target}
      >
        {data.aboutSmallCtaLink.title}
        <span className="right-arrow">
          <span />
          <span />
          <span />
        </span>
      </a>
    </div>
  </div>
)

export default SmallCta

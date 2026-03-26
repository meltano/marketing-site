import React from 'react'

const PricingHero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section pricing">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1 className="hero-title">{data.pricingHeroTitle}</h1>
        <p
          className={`hero-description p1 `}
          dangerouslySetInnerHTML={{ __html: data.pricingHeroText }}
        />
        {data.pricingHeroLink && (
          <div className="hero-buttons">
            <a
              href={data.pricingHeroLink.url}
              className="btn main-btn"
              target={data.pricingHeroLink.target}
            >
              {data.pricingHeroLink.title}
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default PricingHero

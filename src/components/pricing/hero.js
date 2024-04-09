import React from 'react'

const PricingHero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1 className="hero-title">{data.pricingHeroTitle}</h1>
        <p className="hero-description p1">{data.pricingHeroText}</p>
      </div>
    </div>
  </div>
)

export default PricingHero
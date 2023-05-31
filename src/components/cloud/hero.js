import React from 'react'

const CloudHero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info">
        <h1
          className="hero-title"
          dangerouslySetInnerHTML={{ __html: data.cloudHeroTitle }}
        />
        <p className="hero-description p1">{data.cloudHeroText}</p>
      </div>
    </div>
  </div>
)

export default CloudHero

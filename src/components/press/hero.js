import React from 'react'

const PressHero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1
          className="hero-title title-inline"
          dangerouslySetInnerHTML={{ __html: data.pressHeroTitle }}
        />
        <p className="hero-description p1">{data.pressHeroText}</p>
      </div>
    </div>
  </div>
)

export default PressHero

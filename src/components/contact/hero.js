import React from 'react'

const asText = value => (typeof value === 'string' || typeof value === 'number' ? String(value) : '')

const ContactHero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1
          className="hero-title"
          dangerouslySetInnerHTML={{ __html: asText(data?.contactHeroTitle) }}
        />
        <p className="hero-description p1">{asText(data?.contactHeroText)}</p>
      </div>
    </div>
  </div>
)

export default ContactHero

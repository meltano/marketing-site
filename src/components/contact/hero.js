import React from 'react'

const ContactHero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info">
        <h1
          className="hero-title"
          dangerouslySetInnerHTML={{ __html: data.contactHeroTitle }}
        />
        <p className="hero-description p1">{data.contactHeroText}</p>
      </div>
    </div>
  </div>
)

export default ContactHero

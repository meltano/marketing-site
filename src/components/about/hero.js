import React from 'react'

const AboutHero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1
          className="hero-title title-inline"
          dangerouslySetInnerHTML={{ __html: data.aboutHeroTitle }}
        />
        <p className="hero-description p1">{data.aboutHeroText}</p>
        <div className="hero-buttons">
          <a
            href={data.aboutHeroLink.url}
            className="btn alt-blue-btn"
            target={data.aboutHeroLink.target}
            rel="noopener noreferrer"
          >
            {data.aboutHeroLink.title}
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default AboutHero

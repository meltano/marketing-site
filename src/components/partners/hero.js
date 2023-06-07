import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const PartnersHero = ({ data }) => (
  <div className="hero hero-title-section hero-light section">
    <div className="container">
      <div className="hero-info">
        <h1
          className="hero-title title-inline"
          dangerouslySetInnerHTML={{ __html: data.partnersHeroTitle }}
        />
        <p className="hero-description p1">{data.partnersHeroText}</p>
        <StaticImage
          src="../../assets/img/melty-flying.webp"
          className="melty-flyng"
          alt=""
        />
      </div>

      <div className="background-elements">
        <StaticImage
          className="cloud-left ready"
          src="../../assets/img/clouds-1.webp"
          alt=""
        />
        <StaticImage
          className="cloud-right ready"
          src="../../assets/img/clouds-2.webp"
          alt=""
        />
      </div>
    </div>
  </div>
)

export default PartnersHero

import React from 'react'
import StaticImage from '@/components/compat/StaticImage'

const CommunityHero = ({ data }) => (
  <div className="hero hero-scene big-scene section">
    <div className="container">
      <div className="hero-info ml-margins">
        <h1
          className="hero-title"
          dangerouslySetInnerHTML={{ __html: data.communityHeroTitle }}
        />
        <p className="hero-description p1">{data.communityHeroText}</p>
      </div>

      <div className="background-elements">
        <div className="cloud-left ready show">
          <StaticImage
            alt="cloud left"
            src="../../assets/img/clouds-1.webp"
          />
        </div>
        <div className="cloud-right ready show">
          <StaticImage
            alt="cloud right"
            src="../../assets/img/clouds-2.webp"
          />
        </div>
      </div>
    </div>
    <div className="community-bg ready show">
      <StaticImage
        alt="community"
        src="../../assets/img/community-wide.png"
      />
    </div>
  </div>
)

export default CommunityHero

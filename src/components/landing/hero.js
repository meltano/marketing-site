import React from 'react'
import LandingVideo from './video'

const LandingHero = ({ data }) => (
  <div className="hero hero-title-section glow-bg section">
    <div className="container">
      {(data.landingLayoutOneHeroTitle ||
        data.landingLayoutOneHeroSubtitle) && (
        <div className="hero-info ml-margins">
          {data.landingLayoutOneHeroTitle && (
            <h1
              className="hero-title title-inline"
              dangerouslySetInnerHTML={{
                __html: data.landingLayoutOneHeroTitle,
              }}
            />
          )}
          {data.landingLayoutOneHeroSubtitle && (
            <p
              className="hero-description p1"
              dangerouslySetInnerHTML={{
                __html: data.landingLayoutOneHeroSubtitle,
              }}
            />
          )}
        </div>
      )}
      {(data.landingLayoutTwoHeroTitle ||
        data.landingLayoutTwoHeroSubtitle) && (
        <div className="ml-margins">
          <div className="row col-2">
            <div className="side-content">
              {data.landingLayoutTwoHeroTitle && (
                <h2
                  dangerouslySetInnerHTML={{
                    __html: data.landingLayoutTwoHeroTitle,
                  }}
                />
              )}
              {data.landingLayoutTwoHeroSubtitle && (
                <p
                  className="p2"
                  dangerouslySetInnerHTML={{
                    __html: data.landingLayoutTwoHeroSubtitle,
                  }}
                />
              )}
              {/* {data.landingLayoutTwoHeroButton && (
                <a
                  href={data.landingLayoutTwoHeroButton.url}
                  target={data.landingLayoutTwoHeroButton.target}
                  className="btn alt-blue-btn"
                >
                  {data.landingLayoutTwoHeroButton.title}
                </a>
              )} */}
              <p className="p2" />
            </div>
            {data.landingLayoutTwoHeroVideo[0] && (
              <LandingVideo data={data.landingLayoutTwoHeroVideo[0]} />
            )}
          </div>
        </div>
      )}
    </div>
  </div>
)

export default LandingHero

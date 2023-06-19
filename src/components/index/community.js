import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import RadialGradientFX from '../../utils/RadialGradientFX'

const Community = ({ data }) => (
  <div className="community section">
    <RadialGradientFX />
    <div className="container">
      <div className="community-extras">
        {data.communityArray.map(community => (
          <a
            href={community.communityIconLink.url}
            className="community-item radial-gradient"
            key={community.communityIconLink.url}
          >
            <div className="community-info">
              <a
                href={community.communityIconLink.url}
                className="community-item-btn"
                target={community.communityIconLink.target}
                rel="noopener noreferrer"
              >
                <img
                  src={community.communityIcon.localFile.publicURL}
                  alt={community.communityIconLink.title}
                />
              </a>
              <GatsbyImage
                className="community-item-image"
                image={
                  community.communityImage.localFile.childImageSharp
                    .gatsbyImageData
                }
                alt={community.communityTitle}
              />
              <h4
                className="title-inline"
                dangerouslySetInnerHTML={{ __html: community.communityTitle }}
              />
              <a
                href={community.communityDescriptionLink.url}
                className="btn-with-arrow"
                target={community.communityDescriptionLink.target}
                rel="noopener noreferrer"
              >
                {community.communityDescriptionLink.title}
              </a>
            </div>
          </a>
        ))}
        {/* <div className="community-item">
            <div className="community-info">
              <a
                href="https://discuss.dgraph.io/"
                className="community-item-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={CommunitySlack} alt="slack" />
              </a>
              <StaticImage
                className="community-item-image"
                src="../../assets/img/community-slack.webp"
                alt="slack"
              />
              <h4 className="title-inline">
                <span className="brackets">Join</span> 3,000+ <br />
                on Slack
              </h4>
              <a
                href="https://meltano.com/slack"
                className="btn-with-arrow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat and learn from our users
                <span className="right-arrow">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
            </div>
          </div>

          <div className="community-item">
            <div className="community-info">
              <a
                href="https://github.com/meltano/meltano"
                className="community-item-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={CommunityGithub} alt="github" />
              </a>
              <StaticImage
                className="community-item-image"
                src="../../assets/img/community-github.webp"
                alt="github"
              />
              <h4 className="title-inline">
                <span className="brackets">Contribute</span> <br />
                on GitHub
              </h4>
              <a
                href="https://github.com/meltano/meltano"
                className="btn-with-arrow"
                target="_blank"
                rel="noopener noreferrer"
              >
                View code and issue tracker
                <span className="right-arrow">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
            </div>
          </div> */}
      </div>
    </div>
  </div>
)

export default Community

import { GatsbyImage } from 'gatsby-plugin-image'
import { invert } from 'lodash'
import React from 'react'

const Investors = ({ data }) => (
  <div className="investitors section">
    <div className="container">
      <div className="heading">
        <h2
          className="title-inline"
          dangerouslySetInnerHTML={{ __html: data.aboutInvestorsTitle }}
        />
        <p className="heading-description p2">{data.aboutInvestorsText}</p>
      </div>

      <div className="investitors-grid-wrap ml-margins">
        <div className="investitors-grid">
          {data.aboutInvestorsList.map(investors => (
            <a
              href={investors.aboutInvestorsListLink.url}
              target={investors.aboutInvestorsListLink.target}
              className="investitors-grid-item"
              rel="noopener noreferrer"
              key={investors.aboutInvestorsListLink.url}
            >
              <GatsbyImage
                className="investitors-grid-item-image"
                image={
                  investors.aboutInvestorsListImage.localFile.childImageSharp
                    .gatsbyImageData
                }
                alt=""
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default Investors

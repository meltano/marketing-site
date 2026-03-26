import React from 'react'
import CommunityCastle from '../../assets/img/community-castle.svg'

const Build = ({ data }) => (
  <div className="build-with-us section">
    <div className="container">
      <div className="build-with-us-grid">
        <div className="build-with-us-main-cell ml-margins">
          <div className="build-with-us-main-cell-info">
            <h2
              dangerouslySetInnerHTML={{ __html: data.communityBuildTitle }}
            />
            <p className="p2">{data.communityBuildText}</p>
          </div>
          <div className="build-with-us-main-cell-img-wrap">
            <img
              src={CommunityCastle}
              alt="Community Castle"
              className="build-with-us-main-cell-img"
            />
          </div>
        </div>
        <div className="build-with-us-cell-row ml-margins">
          {data.communityBuildBoxes.map(box => (
            <div
              className="build-with-us-cell"
              key={box.communityBuildBoxesTitle}
            >
              <div className="build-with-us-cell-info">
                <div className="build-with-us-cell-header">
                  <img
                    src={box.communityBuildBoxesIcon.localFile.publicURL}
                    alt="Slack"
                  />
                  <h5>{box.communityBuildBoxesTitle}</h5>
                </div>
                <p className="p2">{box.communityBuildBoxesText}</p>
                <a
                  href={box.communityBuildBoxesLink.url}
                  target={box.communityBuildBoxesLink.target}
                  className="btn alt-blue-btn"
                  rel="noopener noreferrer"
                >
                  {box.communityBuildBoxesLink.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default Build

import React from 'react'

const Mission = ({ data }) => (
  <div className="meltano-mission section">
    <div className="about-container">
      <div className="meltano-mission-image-wrap">
        <div className="meltano-mission-image" />
      </div>
      <div className="meltano-mission-info">
        <div className="meltano-mission-headeing">
          <h2 className="title-inline">{data.aboutMissionTitle}</h2>
        </div>

        <div className="meltano-mission-tabs">
          <div className="meltano-mission-tabs-containers">
            <div
              className="meltano-mission-tabs-container active-mission"
              dangerouslySetInnerHTML={{ __html: data.aboutMissionText }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Mission

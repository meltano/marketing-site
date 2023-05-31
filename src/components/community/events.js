import React from 'react'

const Events = ({ data }) => (
  <div className="grid-2-by-2 section">
    <div className="container">
      <div className="heading">
        <h2
          className="title-inline"
          dangerouslySetInnerHTML={{ __html: data.communityEventsTitle }}
        />
      </div>
      <div className="grid-2-by-2-container ml-margins">
        <div className="grid-2-by-2-item gear-grid-item-single">
          <div className="grid-2-by-2-wrap">
            <div className="grid-2-by-2-info">
              <div className="grid-2-by-2-header">
                <img
                  src={data.communityEventsIcon.localFile.publicURL}
                  alt=""
                />
              </div>
              <p className="p2">{data.communityEventsText}</p>
            </div>
            <a
              href={data.communityEventsLink.url}
              className="btn-with-arrow"
              target={data.communityEventsLink.target}
              rel="noopener noreferrer"
            >
              {data.communityEventsLink.title}
              <span className="right-arrow">
                <span />
                <span />
                <span />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default Events

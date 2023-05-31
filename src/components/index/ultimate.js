import React from 'react'
import { Link } from 'gatsby'

const Ultimate = ({ data }) => (
  <div className="grid-2-by-2 section">
    <div className="container">
      <div className="heading">
        <h2
          className="title-inline"
          dangerouslySetInnerHTML={{ __html: data.ultimateHeading }}
        />
        <p
          className="p2 heading-description"
          dangerouslySetInnerHTML={{ __html: data.ultimateDescription }}
        />
      </div>
      <div className="grid-2-by-2-container ml-margins">
        {data.ultimateArray.map(ultimate => (
          <div className="grid-2-by-2-item" key={ultimate.ultimateTitle}>
            <div className="grid-2-by-2-wrap">
              <div className="grid-2-by-2-info">
                <div className="grid-2-by-2-header">
                  <img
                    src={ultimate.ultimateIcon.localFile.publicURL}
                    alt="shield"
                    loading="lazy"
                  />
                  <h4>{ultimate.ultimateTitle}</h4>
                </div>
                <p className="p2">{ultimate.ultimateText}</p>
              </div>
              <Link
                to={ultimate.ultimateLink.url}
                className="btn colorful-btn"
                target={ultimate.ultimateLink.target}
              >
                <span />
                {ultimate.ultimateLink.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Ultimate

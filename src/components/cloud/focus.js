import React from 'react'

const Focus = ({ data }) => (
  <div className="focus glow-bg">
    <div className="container">
      <div className="focus-heading">
        <h2
          className="title-inline"
          dangerouslySetInnerHTML={{ __html: data.cloudFocusTitle }}
        />
      </div>
      <div className="focus-grid">
        {data.cloudFocusList.map(item => (
          <div className="focus-grid-item" key={item.cloudFocusListTitle}>
            <img
              src={item.cloudFocusListIcon.localFile.publicURL}
              alt={item.cloudFocusListTitle}
            />
            <h4>{item.cloudFocusListTitle}</h4>
            <p className="p2">{item.cloudFocusListText}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Focus

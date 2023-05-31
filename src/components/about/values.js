import React from 'react'

const Values = ({ data }) => (
  <div className="grid-2-by-2 section">
    <div className="container">
      <div className="heading">
        <h2
          className="title-inline"
          dangerouslySetInnerHTML={{ __html: data.aboutValuesTitle }}
        />
      </div>
      <div className="grid-2-by-2-container ml-margins">
        {data.aboutValuesList.map(value => (
          <div className="grid-2-by-2-item" key={value.aboutValuesItemTitle}>
            <div className="grid-2-by-2-wrap">
              <div className="grid-2-by-2-info">
                <div className="grid-2-by-2-header">
                  <img
                    src={value.aboutValuesItemIcon.localFile.publicURL}
                    alt={value.aboutValuesItemTitle}
                  />
                  <h4>{value.aboutValuesItemTitle}</h4>
                </div>
                <p className="p2">{value.aboutValuesItemText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
export default Values

import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Faq = ({ data }) => (
  <div className="faq">
    <div className="container">
      <div className="faq-heading">
        <h3>{data.contactFaqTitle}</h3>
      </div>
      <div className="faq-articles ml-margins">
        {data.contactFaqList.map((qa, i) => (
          <article
            className="faq-accordion"
            key={qa.contactFaqItem.contactFaqItemQuestion}
          >
            <input
              type="checkbox"
              className="tgg-title"
              id={`tgg-title-${i}`}
            />
            <div className="faq-accordion-title">
              <label htmlFor={`tgg-title-${i}`}>
                <p className="p1">{qa.contactFaqItem.contactFaqItemQuestion}</p>
                <span className="arrow-icon">
                  <StaticImage src="../assets/img/down-arrow.svg" />
                </span>
              </label>
            </div>
            <div className="faq-accordion-content">
              <div
                className="p3"
                dangerouslySetInnerHTML={{
                  __html: qa.contactFaqItem.contactFaqItemAnswer,
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
)

export default Faq

import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Quote = ({ data }) => (
  <div className="quote-banner section">
    <div className="container">
      <div className="quote-banner-wrap ml-margins">
        <GatsbyImage
          className="quote-image"
          image={data.aboutQuoteImage.localFile.childImageSharp.gatsbyImageData}
          layout="fixed"
          alt=""
        />
        <div className="quote-banner-info">
          <div
            className="quote-banner-text"
            dangerouslySetInnerHTML={{ __html: data.aboutQuoteText }}
          />
          <p className="p1 quote-banner-author">{data.aboutQuoteAuthor}</p>
        </div>
      </div>
    </div>
  </div>
)

export default Quote

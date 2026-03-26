import React from 'react'
import { GatsbyImage } from '@/components/compat/GatsbyImage'
import StaticImage from '@/components/compat/StaticImage'

const Quote = ({ data }) => (
  <div className="quote-banner section">
    <div className="container">
      <div className="quote-banner-wrap ml-margins">
        <GatsbyImage
          className="quote-image"
          image={data.aboutQuoteImage.localFile.childImageSharp.gatsbyImageData}
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

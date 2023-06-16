import React, { useState, useEffect } from 'react'

const Testimonials = ({ data }) => {
  const [shuffled, setShuffled] = useState([])
  const [title, setTitle] = useState('')
  // const [loadMoreBtn, setLoadMoreBtn] = useState(false)

  useEffect(() => {
    setTitle(data.testimonialsHeading)
    // setLoadMoreBtn(true)
    const shuffledTestimonials = data.testimonialsArray
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    setShuffled(shuffledTestimonials)
  }, [])

  // const handleShowMore = () => {
  //   setLoadMoreBtn(false)
  // }

  return (
    <div className="testimonials section">
      <div className="container">
        <div className="heading">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="testimonials-grid ml-margins">
          {/* <div
          className={`testimonials-grid ml-margins ${
            !loadMoreBtn ? 'reveal-testimonials' : ''
          }`}
        > */}
          {shuffled.map(testimonial => (
            <div
              className="testimonials-grid-item"
              key={testimonial.testimonialsAuthor}
            >
              <div className="testimonials-grid-item-info">
                <p
                  className="p3 testimonials-grid-quote"
                  dangerouslySetInnerHTML={{
                    __html: testimonial.testimonialsText,
                  }}
                />
                <div className="testimonials-grid-author">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.86114 15.7224H0V7.86117L3.2654 0H7.55879L5.44233 7.86117H7.86114V15.7224ZM19.3505 15.7224H11.4894V7.86117L14.7548 0H19.0482L16.9317 7.86117H19.3505V15.7224Z" />
                  </svg>
                  <p>{testimonial.testimonialsAuthor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {loadMoreBtn && (
          <button
            onClick={handleShowMore}
            id="load-more-quotes-btn"
            className="btn alt-blue-btn middle"
            type="button"
          >
            Load more
          </button>
        )} */}
      </div>
    </div>
  )
}

export default Testimonials

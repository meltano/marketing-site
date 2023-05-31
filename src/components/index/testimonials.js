import React, { useState, useEffect } from 'react'

const Testimonials = ({ data }) => {
  const [loadMoreBtn, setLoadMoreBtn] = useState(true)

  const handleShowMore = () => {
    setLoadMoreBtn(false)
  }

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="testimonials section">
      <div className="container">
        <div className="heading">
          <h2 dangerouslySetInnerHTML={{ __html: data.testimonialsHeading }} />
        </div>

        <div
          className={`testimonials-grid ml-margins ${
            !loadMoreBtn ? 'reveal-testimonials' : ''
          }`}
        >
          {loaded &&
            data.testimonialsArray
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
              .map(testimonial => (
                <div
                  className="testimonials-grid-item"
                  key={testimonial.testimonialsAuthor}
                >
                  <div className="testimonials-grid-item-info">
                    <p className="p3 testimonials-grid-quote">
                      {testimonial.testimonialsText}
                    </p>
                    <div className="testimonials-grid-author">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="34"
                        viewBox="0 0 19 34"
                        fill="none"
                      >
                        <path
                          d="M1 31.6V32.6H2H15.2H16.2V31.6V17.6V16.6H15.2H10.4934C10.922 15.2926 11.5997 14.1603 12.5241 13.1897L12.5321 13.1813L12.5399 13.1727C13.7148 11.8803 15.3239 10.9687 17.429 10.4734L18.2 10.292V9.5V3V1.76416L16.9914 2.02201C11.7999 3.12953 7.77029 5.50628 5 9.2L4.99994 9.19996L4.99261 9.20999C2.30654 12.8857 1 17.5066 1 23V31.6Z"
                          strokeWidth="2"
                        />
                      </svg>
                      <p>{testimonial.testimonialsAuthor}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {loadMoreBtn && (
          <button
            onClick={handleShowMore}
            id="load-more-quotes-btn"
            className="btn alt-blue-btn middle"
            type="button"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  )
}

export default Testimonials

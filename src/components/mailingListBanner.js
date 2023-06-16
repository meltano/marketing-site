import React, { useState } from 'react'

const MailingListBanner = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    // onClose()
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="container">
      <div className="mailing-list-banner">
        <div className="mailing-list-banner-info">
          <h5>Join our mailing list</h5>
          <p>Stay current with all things Meltano</p>
        </div>

        <form className="mainling-list-banner-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="btn alt-blue-btn">
            Subscribe
          </button>
        </form>
        <button
          type="button"
          className="close-mailing-banner"
          onClick={handleClose}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="11.667"
              y1="3.8892"
              x2="3.88886"
              y2="11.6674"
              stroke="white"
            />
            <line
              x1="11.667"
              y1="11.667"
              x2="3.88878"
              y2="3.88885"
              stroke="white"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MailingListBanner

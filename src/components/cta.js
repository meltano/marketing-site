import React from 'react'
import { Link } from 'gatsby'

export const CtaIntrigued = () => (
  <div className="cta section">
    <div className="container">
      <div className="cta-banner ml-margins">
        <div className="cta-banner-info">
          <h2>
            Intrigued<span className="pink">?</span>
          </h2>
          <p className="p2">You haven’t seen nothing yet!</p>
          <div className="cta-banner-buttons">
            <a
              href="https://meltano.com/demo"
              target="_blank"
              className="btn alt-blue-btn"
              rel="noreferrer"
            >
              Try live demo
            </a>
            <a
              href="https://meltano.com/get-started"
              className="btn colorful-btn"
              target="_blank"
              rel="noreferrer"
            >
              <span />
              Install open source
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const CtaYourself = () => (
  <div className="cta section">
    <div className="container">
      <div className="cta-banner ml-margins">
        <div className="cta-banner-info">
          <h2 className="title-inline">
            Want to see it <br />
            <span className="brackets">for yourself</span>?
          </h2>
          <div className="cta-banner-buttons">
            <a
              href="https://meltano.com/demo"
              className="btn alt-blue-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try live demo
            </a>
            <a
              href="https://docs.meltano.com/getting-started/installation"
              className="btn colorful-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span />
              Install locally
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

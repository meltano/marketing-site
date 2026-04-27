import React, { useState } from 'react'

const PORTAL_ID = '7921409'
const FORM_ID = '5beb0e30-412f-442b-8179-2a85a3f81d47'

const MailingListBanner = ({ onClose = () => {} }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [{ name: 'email', value: email }],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      )

      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
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

        {status === 'success' ? (
          <p className="mailing-list-banner-success">Thanks for subscribing!</p>
        ) : (
          <form className="mailing-list-banner-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              className="btn alt-blue-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
            {status === 'error' && (
              <p className="mailing-list-banner-error">Something went wrong. Please try again.</p>
            )}
          </form>
        )}

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

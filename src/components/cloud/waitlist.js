import React from 'react'
import HubspotForm from 'react-hubspot-form'

const Waitlist = ({ data }) => (
  <div className="contact-form">
    <div className="container">
      <div className="contact-form-container ml-margins">
        <div>
          <div className="contact-form-sidebar">
            <h4
              className="title-inline"
              dangerouslySetInnerHTML={{ __html: data.cloudWaitlistTitle }}
            />
            <ol className="contact-form-sidebar-list">
              {data.cloudWaitlistList.map(item => (
                <li
                  className="p3"
                  dangerouslySetInnerHTML={{
                    __html: item.cloudWaitlistListItem,
                  }}
                  key={item.cloudWaitlistListItem}
                />
              ))}
            </ol>
          </div>
          {data.cloudWaitlistButtons && (
            <div className="cloud-buttons">
              {data.cloudWaitlistButtons.cloudWaitlistButtonsOne && (
                <a
                  href={data.cloudWaitlistButtons.cloudWaitlistButtonsOne.url}
                  className="btn alt-blue-btn"
                  target={
                    data.cloudWaitlistButtons.cloudWaitlistButtonsOne.target
                  }
                  rel="noopener noreferrer"
                >
                  {data.cloudWaitlistButtons.cloudWaitlistButtonsOne.title}
                </a>
              )}
              {data.cloudWaitlistButtons.cloudWaitlistButtonsTwo && (
                <a
                  href={data.cloudWaitlistButtons.cloudWaitlistButtonsTwo.url}
                  className="btn colorful-btn"
                  target={
                    data.cloudWaitlistButtons.cloudWaitlistButtonsTwo.target
                  }
                  rel="noopener noreferrer"
                >
                  <span />
                  {data.cloudWaitlistButtons.cloudWaitlistButtonsTwo.title}
                </a>
              )}
            </div>
          )}
        </div>
        {console.log(data.cloudWaitlistButtons)}
        <div className="form dark-form">
          <h3>Access the Beta</h3>
          <HubspotForm
            portalId="20712484"
            formId="07ef595d-2aed-4573-a6fe-c1c5873d3887"
            onSubmit={() => console.log('Submit!')}
            onReady={form => console.log('Form ready!')}
            loading={<div>Loading...</div>}
          />

          <p class="hs-field-desc hs-form-field">
            By signing up, you agree to our{' '}
            <a href="/terms-of-service" target="_blank" style={{color: "#18c3fa"}}>Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy-policy" target="_blank" style={{color: "#18c3fa"}}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default Waitlist

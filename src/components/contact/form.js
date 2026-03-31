import React from 'react'
import dynamic from 'next/dynamic'

const HubspotForm = dynamic(() => import('react-hubspot-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const asText = value => (typeof value === 'string' || typeof value === 'number' ? String(value) : '')

const ContactForm = ({ data }) => (
  <div className="contact-form">
    <div className="container">
      <div className="contact-form-container reversed">
        <div className="contact-form-sidebar">
          <h4>{asText(data?.contactFormTitle)}</h4>
          <p className="p2">{asText(data?.contactFormText)}</p>
          <ul className="contact-form-sidebar-list">
            {(Array.isArray(data?.contactFormLinks) ? data.contactFormLinks : []).map((links, idx) => (
              <li className="p3" key={`${asText(links?.contactFormLinksTitle)}-${idx}`}>
                <img
                  src={links?.contactFormLinksIcon?.localFile?.publicURL || ''}
                  alt={asText(links?.contactFormLinksTitle)}
                />
                <div className="contact-form-sidebar-list-info">
                  <h6>{asText(links?.contactFormLinksTitle)}</h6>
                  <a
                    href={asText(links?.contactFormLinksLink?.url) || '#'}
                    target={asText(links?.contactFormLinksLink?.target) || '_self'}
                    rel="noopener noreferrer"
                  >
                    {asText(links?.contactFormLinksLink?.title)}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="form dark-form">
          <h3>How can we help?</h3>
          <HubspotForm
            portalId={asText(data?.contactFormHubspot?.contactFormHubspotPortalId)}
            formId={asText(data?.contactFormHubspot?.contactFormHubspotFormId)}
            onSubmit={() => console.log('Submit!')}
            onReady={form => console.log('Form ready!')}
          />
        </div>
      </div>
    </div>
  </div>
)

export default ContactForm

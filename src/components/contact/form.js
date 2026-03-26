import React from 'react'
import HubspotForm from 'react-hubspot-form'

const ContactForm = ({ data }) => (
  <div className="contact-form">
    <div className="container">
      <div className="contact-form-container reversed">
        <div className="contact-form-sidebar">
          <h4>{data.contactFormTitle}</h4>
          <p className="p2">{data.contactFormText}</p>
          <ul className="contact-form-sidebar-list">
            {data.contactFormLinks.map(links => (
              <li className="p3">
                <img
                  src={links.contactFormLinksIcon.localFile.publicURL}
                  alt={links.contactFormLinksTitle}
                />
                <div className="contact-form-sidebar-list-info">
                  <h6>{links.contactFormLinksTitle}</h6>
                  <a
                    href={links.contactFormLinksLink.url}
                    target={links.contactFormLinksLink.target}
                    rel="noopener noreferrer"
                  >
                    {links.contactFormLinksLink.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="form dark-form">
          <h3>How can we help?</h3>
          <HubspotForm
            portalId={data.contactFormHubspot.contactFormHubspotPortalId}
            formId={data.contactFormHubspot.contactFormHubspotFormId}
            onSubmit={() => console.log('Submit!')}
            onReady={form => console.log('Form ready!')}
            loading={<div>Loading...</div>}
          />
        </div>
      </div>
    </div>
  </div>
)

export default ContactForm

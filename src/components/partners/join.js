import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import HubspotForm from 'react-hubspot-form'

const Join = ({ data }) => (
  <div className="join-our-community contact-form">
    <div className="container">
      <div className="contact-form-container">
        <div className="contact-form-row">
          <div className="contact-form-sidebar">
            <h2>{data.partnersFormTitle}</h2>
            <p className="p2">{data.partnersFormText}</p>
            <StaticImage
              className="join-our-community-img"
              src="../../assets/img/join-our-community-bg.webp"
              alt="join"
            />
          </div>
          <div className="form light-form">
            <HubspotForm
              portalId={data.partnersFormHubspot.partnersFormHubspotPortalId}
              formId={data.partnersFormHubspot.partnersFormHubspotFormId}
              onSubmit={() => console.log('Submit!')}
              onReady={form => console.log('Form ready!')}
              loading={<div>Loading...</div>}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Join

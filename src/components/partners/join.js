import React from 'react'
import StaticImage from '@/components/compat/StaticImage'
import dynamic from 'next/dynamic'

const HubspotForm = dynamic(() => import('react-hubspot-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const asText = value => (typeof value === 'string' || typeof value === 'number' ? String(value) : '')

const Join = ({ data }) => (
  <div className="join-our-community contact-form">
    <div className="container">
      <div className="contact-form-container">
        <div className="contact-form-row">
          <div className="contact-form-sidebar">
            <h2>{asText(data?.partnersFormTitle)}</h2>
            <p className="p2">{asText(data?.partnersFormText)}</p>
            <StaticImage
              className="join-our-community-img"
              src="../../assets/img/join-our-community-bg.webp"
              alt="join"
            />
          </div>
          <div className="form light-form">
            <HubspotForm
              portalId={asText(data?.partnersFormHubspot?.partnersFormHubspotPortalId)}
              formId={asText(data?.partnersFormHubspot?.partnersFormHubspotFormId)}
              onSubmit={() => console.log('Submit!')}
              onReady={form => console.log('Form ready!')}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Join

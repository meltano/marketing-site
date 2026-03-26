import React from 'react'
import HubspotForm from 'react-hubspot-form'

const LandingContentThree = ({ data }) => (
  <div className="container">
    <div className="ml-margins">
      <div className="row col-2">
        <div className="dark-form form widget-form col-6 layout-imgt">
          {data.landingLayoutThreeContentImage && (
            <img
              src={data.landingLayoutThreeContentImage.localFile.publicURL}
              alt=""
              className=""
            />
          )}
          {data.landingLayoutThreeContentText && (
            <p
              className="p2"
              dangerouslySetInnerHTML={{
                __html: data.landingLayoutThreeContentText,
              }}
            />
          )}
        </div>
        {data.landingLayoutThreeFormId && (
          <div className="dark-form form widget-form col-6">
            <h4
              className="title-inline"
              dangerouslySetInnerHTML={{
                __html: data.landingLayoutThreeFormTitle,
              }}
            />
            <div
              className="wpcf7 js"
              id="wpcf7-f4915-p5212-o1"
              dir="ltr"
              lang="en"
            >
              <div className="screen-reader-response">
                <p role="status" aria-live="polite" aria-atomic="true" /> <ul />
              </div>
              <HubspotForm
                portalId="20712484"
                formId={data.landingLayoutThreeFormId}
                onSubmit={() => console.log('Submitted!')}
                onReady={form => console.log('Form ready!')}
                loading={<div>Loading...</div>}
                cssClass="form-subsribe"
                submitButtonClass="form-subscribe-submit"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default LandingContentThree

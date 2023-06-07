import React from 'react'
import HubspotForm from 'react-hubspot-form'

const LandingContent = ({ data }) => (
  <div className="container">
    <div className="ml-margins">
      {data.landingLayoutOneListTitle && (
        <div className="row col-2">
          <div className="contact-form-sidebar">
            <h4
              className="title-inline"
              dangerouslySetInnerHTML={{
                __html: data.landingLayoutOneListTitle,
              }}
            />
            <ol className="contact-form-sidebar-list">
              {data.landingLayoutOneListContent.map(item => (
                <li className="p3">{item.landingLayoutOneListItem}</li>
              ))}
            </ol>
            {data.landingLayoutOneListButton && (
              <a
                href={data.landingLayoutOneListButton.url}
                target={data.landingLayoutOneListButton.target}
                className="btn alt-blue-btn"
              >
                {data.landingLayoutOneListButton.title}
              </a>
            )}
          </div>
          {data.landingLayoutOneFormId && (
            <div className="dark-form form widget-form">
              <h4
                className="title-inline"
                dangerouslySetInnerHTML={{
                  __html: data.landingLayoutOneFormTitle,
                }}
              />
              <div
                className="wpcf7 js"
                id="wpcf7-f4915-p5212-o1"
                dir="ltr"
                lang="en"
              >
                <div className="screen-reader-response">
                  <p role="status" aria-live="polite" aria-atomic="true" />{' '}
                  <ul />
                </div>
                <HubspotForm
                  portalId="20712484"
                  formId={data.landingLayoutOneFormId}
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
      )}
      {!data.landingLayoutOneListTitle && (
        <div className="row col-2">
          {data.map(list => (
            <div
              className="contact-form-sidebar"
              key={
                list.landingLayoutTwoListsList.landingLayoutTwoListsListTitle
              }
            >
              <h4
                className="title-inline"
                dangerouslySetInnerHTML={{
                  __html:
                    list.landingLayoutTwoListsList
                      .landingLayoutTwoListsListTitle,
                }}
              />
              <ol className="contact-form-sidebar-list">
                {list.landingLayoutTwoListsList.landingLayoutTwoListsListItems.map(
                  item => (
                    <li className="p3" key={item.landingLayoutTwoListsListItem}>
                      {item.landingLayoutTwoListsListItem}
                    </li>
                  )
                )}
              </ol>
              {list.landingLayoutTwoListsList
                .landingLayoutTwoListsListButton && (
                <a
                  href={
                    list.landingLayoutTwoListsList
                      .landingLayoutTwoListsListButton.url
                  }
                  target={
                    list.landingLayoutTwoListsList
                      .landingLayoutTwoListsListButton.target
                  }
                  className="btn alt-blue-btn"
                >
                  {
                    list.landingLayoutTwoListsList
                      .landingLayoutTwoListsListButton.title
                  }
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)

export default LandingContent

/* eslint-disable no-inner-declarations */
import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

const Preheader = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allWpPage(filter: { title: { eq: "Home" } }) {
          nodes {
            preHeader {
              preHeaderOn
              preHeaderLink {
                title
                url
                target
              }
              preHeaderTextShort
              preHeaderTextLong
            }
          }
        }
      }
    `
  )

  const { preHeader } = data.allWpPage.nodes[0]

  if (preHeader.preHeaderOn)
    return (
      <>
        <Helmet>
          <body data-prehead="true" />
        </Helmet>
        <div className="pre-header">
          <div className="pre-header-container">
            {preHeader.preHeaderLink ? (
              <Link to={preHeader.preHeaderLink.url}>
                <div className="pre-header-content p3">
                  <span
                    className="show-desktop"
                    dangerouslySetInnerHTML={{
                      __html: preHeader.preHeaderTextLong
                        ? preHeader.preHeaderTextLong
                        : preHeader.preHeaderTextShort,
                    }}
                  />
                  <span
                    className="show-mobile"
                    dangerouslySetInnerHTML={{
                      __html: preHeader.preHeaderTextShort
                        ? preHeader.preHeaderTextShort
                        : preHeader.preHeaderTextLong,
                    }}
                  />
                </div>
              </Link>
            ) : (
              <div className="pre-header-content p3">
                <span
                  className="show-desktop"
                  dangerouslySetInnerHTML={{
                    __html: preHeader.preHeaderTextLong
                      ? preHeader.preHeaderTextLong
                      : preHeader.preHeaderTextShort,
                  }}
                />
                <span
                  className="show-mobile"
                  dangerouslySetInnerHTML={{
                    __html: preHeader.preHeaderTextShort
                      ? preHeader.preHeaderTextShort
                      : preHeader.preHeaderTextLong,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </>
    )
  return null
}
export default Preheader

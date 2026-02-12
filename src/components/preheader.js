/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from 'react'
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
  const { preHeaderOn } = preHeader

  const [isVisible, setIsVisible] = useState(true)
  const [isClosed, setIsClosed] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const id = encodeURIComponent(`${preHeader.preHeaderTextShort}w`)

  const handleClose = () => {
    setIsClosed(true)
    setIsVisible(false)
    localStorage.setItem(`meltano.announcement.closed`, JSON.stringify(true))
  }

  useEffect(() => {
    if (!preHeaderOn) {
      return
    }

    const viewedId = localStorage.getItem(`meltano.announcement`)

    setIsNew(viewedId !== JSON.stringify(id))

    if (viewedId !== JSON.stringify(id)) {
      localStorage.setItem(`meltano.announcement`, JSON.stringify(id))
      setIsNew(true)
    }

    if (!isClosed) {
      localStorage.removeItem(`meltano.announcement.closed`)
      setIsVisible(true)
    }

    if (isClosed && isNew) {
      localStorage.setItem(`meltano.announcement`, JSON.stringify(id))
      setIsVisible(true)
      setIsClosed(false)
    }
  }, [isNew, isClosed, id, preHeaderOn])

  if (isVisible)
    return (
      <>
        <Helmet>
          <body data-prehead="true" />
        </Helmet>
        <div className="pre-header">
          <div className="pre-header-container">
            {preHeader.preHeaderLink ? (
              <a href={preHeader.preHeaderLink.url}>
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
              </a>
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
          <button
            type="button"
            aria-label="Close"
            className="close-preheader-button"
            onClick={handleClose}
          >
            <svg viewBox="0 0 28 19" width="14" height="14">
              <g>
                <path
                  id="Vector 1"
                  d="M23 17.5L7 1.5"
                  stroke="#ffffff"
                  strokeWidth="3.1"
                />
                <path
                  id="Vector 3"
                  d="M23 1.5L7 17.5"
                  stroke="#ffffff"
                  strokeWidth="3.1"
                />
              </g>
            </svg>
          </button>
        </div>
      </>
    )
  return null
}
export default Preheader

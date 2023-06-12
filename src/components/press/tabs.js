import React, { useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const PressTabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState('News')

  const tabClick = id => {
    setActiveTab(id)
  }

  const activeTabContent = data.pressTabsTab.find(
    tab => tab.pressTabsTabTitle === activeTab
  )

  const tabContent =
    activeTabContent?.pressTabsTabContent ||
    activeTabContent?.pressTabsTabContentLogos

  return (
    <div className="press glow-bg">
      <div className="container">
        <div className="ml-margins">
          <div id="tabs-container-1" className="tabs-container">
            <section className="tab-container">
              <div className="tab-title">
                {data.pressTabsTab.map(tab => (
                  <button
                    className={`tab-button ${
                      activeTab === tab.pressTabsTabTitle
                        ? 'tab_button-active'
                        : ''
                    }`}
                    key={tab.pressTabsTabTitle}
                    onClick={() => tabClick(tab.pressTabsTabTitle)}
                    type="button"
                  >
                    {tab.pressTabsTabTitle}
                  </button>
                ))}
              </div>

              <div
                className={`tab-inside ${
                  activeTabContent ? 'tab-inside-active' : ''
                } ${activeTab === 'Logos' ? 'column' : ''}`}
              >
                {activeTab === 'Logos' ? (
                  <>
                    <div className="tab-inside-heading">
                      <h3 className="tab-inside-title">
                        {tabContent.pressTabsTabContentLogosTitle}
                      </h3>
                      <p className="tab-inside-description">
                        {tabContent.pressTabsTabContentLogosText}
                      </p>
                    </div>
                    <div className="tab-inside-full tabs-four-columns">
                      {tabContent.pressTabsTabContentLogosList.map(item => (
                        <div
                          className={`sources-mini-box ${
                            item.pressTabsTabContentLogosListTitle.includes(
                              'light'
                            )
                              ? 'sources-mini-box-white'
                              : 'sources-mini-box-purple'
                          } ${
                            item.pressTabsTabContentLogosListImage.width /
                              item.pressTabsTabContentLogosListImage.height <
                            1.2
                              ? 'rounded'
                              : ''
                          }`}
                          key={
                            item.pressTabsTabContentLogosListImage.localFile
                              .publicURL
                          }
                        >
                          <img
                            src={
                              item.pressTabsTabContentLogosListImage.localFile
                                .publicURL
                            }
                            alt={item.pressTabsTabContentLogosListTitle}
                          />
                          <p className="sources-mini-box-title">
                            {item.pressTabsTabContentLogosListTitle}
                          </p>
                          <div className="sources-file-types">
                            {item.pressTabsTabContentLogosListLinks.map(
                              link =>
                                link.pressTabsTabContentLogosListLinksItem && (
                                  <a
                                    href={
                                      link.pressTabsTabContentLogosListLinksItem
                                        .localFile.publicURL
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {link.pressTabsTabContentLogosListLinksItem.localFile.ext.substring(
                                      1
                                    )}
                                  </a>
                                )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="tab-inside-full">
                    {activeTabContent?.pressTabsTabContent.map(content => (
                      <div
                        className="external-link-block"
                        key={content.pressTabsTabContentTitle}
                      >
                        <a
                          href={content.pressTabsTabContentLink.url}
                          className="external-link-block-img"
                          target={content.pressTabsTabContentLink.target}
                          rel="noopener noreferrer"
                        >
                          <GatsbyImage
                            image={
                              content.pressTabsTabContentImage.localFile
                                .childImageSharp.gatsbyImageData
                            }
                            alt={content.pressTabsTabContentTitle}
                          />
                        </a>
                        <div className="external-link-block-info">
                          <div className="external-link-block-heading">
                            <p className="external-link-block-category">
                              {content.pressTabsTabContentTitle}
                            </p>
                            <a
                              href="https://thenewstack.io/beyond-elt-what-is-a-dataops-os/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <h6>{content.pressTabsTabContentText}</h6>
                            </a>
                          </div>
                          <a
                            href={content.pressTabsTabContentLink.url}
                            className="btn-with-arrow"
                            target={content.pressTabsTabContentLink.target}
                            rel="noopener noreferrer"
                          >
                            {content.pressTabsTabContentLink.title}
                            <span className="right-arrow">
                              <span />
                              <span />
                              <span />
                            </span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressTabs

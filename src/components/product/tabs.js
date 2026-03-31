/* eslint-disable no-nested-ternary */
/* eslint-disable import/newline-after-import */
/* eslint-disable react/jsx-no-comment-textnodes */
'use client'

import React, { useState, useEffect } from 'react'
import { Highlight, Prism, themes } from 'prism-react-renderer'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import DocsIconDashboard from '../../assets/img/docs-icon-dashboard.svg'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-python')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-shell-session')

const ProductTabs = ({ data }) => {
  const router = useRouter()
  const pathname = router.pathname || '/'
  const [tabIndex, setTabIndex] = useState(0)

  const hashForIndex = index => {
    if (index === 0) return '#saas'
    if (index === 1) return '#database'
    return '#custom-source'
  }

  const handleSelectChange = event => {
    const selectedValue = event.target.value
    if (selectedValue === '0') {
      router.push(`${pathname}#saas`)
    } else if (selectedValue === '1') {
      router.push(`${pathname}#database`)
    } else if (selectedValue === '2') {
      router.push(`${pathname}#custom-source`)
    }
  }

  useEffect(() => {
    const sync = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : ''
      if (hash === '#saas') {
        setTabIndex(0)
      } else if (hash === '#database') {
        setTabIndex(1)
      } else if (hash === '#custom-source') {
        setTabIndex(2)
      }
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return (
    <div className="extract-data">
      <div className="container super-container">
        <div className="tabs-section-wrap">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={index => {
              setTabIndex(index)
              // Keep the URL hash in sync for deep links and Lighthouse crawl parity.
              router.push(`${pathname}${hashForIndex(index)}`)
            }}
          >
            <div className="extract-data-box">
              <h5 className="extract-data-box-title">
                {data.productTabsTitle}
              </h5>
              <TabList className="tab-title tab-title-nav">
                {data.productTab.map(tab => (
                  <Tab
                    key={tab.productTabNumber}
                    className="tab-button"
                    selectedClassName="tab_button-active"
                    id={
                      tab.productTabNumber === 1
                        ? 'saas-button'
                        : tab.productTabNumber === 2
                        ? 'database-button'
                        : 'custom-source-button'
                    }
                  >
                    {tab.productTabTitle}
                  </Tab>
                ))}
              </TabList>

              <div className="tab-title-drop">
                <label
                  htmlFor="tab-title-filters"
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    border: 0,
                  }}
                >
                  Select product experience
                </label>
                <select id="tab-title-filters" onChange={handleSelectChange}>
                  {data.productTab.map(tab => (
                    <option
                      key={tab.productTabNumber}
                      value={parseInt(tab.productTabNumber) - 1}
                    >
                      {tab.productTabTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="benefit-tabs">
              <div className="tabs-container">
                <section className="tab-container">
                  <div className="container">
                    {data.productTab
                      .filter(t => data.productTab.indexOf(t) === tabIndex)
                      .map(tab => (
                        <div
                          className="tab-inside tab-inside-active ml-margins"
                          key={tab.productTabNumber}
                        >
                          <div className="tab-inside-column">
                            <h3
                              dangerouslySetInnerHTML={{
                                __html:
                                  tab.productTabBenefits
                                    .productTabBenefitsTitle,
                              }}
                            />
                          </div>
                          <div className="tab-inside-column">
                            <ul className="benefits-list">
                              {tab.productTabBenefits.productTabBenefitsItems.map(
                                item => {
                                  const icon = item.productTabBenefitsItemImage
                                  const src =
                                    icon?.localFile?.publicURL ||
                                    icon?.sourceUrl ||
                                    ''
                                  const width = icon?.width || 1
                                  const height = icon?.height || 1

                                  if (!src) {
                                    return (
                                      <li
                                        key={item.productTabBenefitsItemText}
                                      >
                                        <h4>
                                          {item.productTabBenefitsItemText}
                                        </h4>
                                      </li>
                                    )
                                  }

                                  return (
                                    <li key={item.productTabBenefitsItemText}>
                                      <Image
                                        src={src}
                                        alt={item.productTabBenefitsItemText}
                                        width={width}
                                        height={height}
                                        className="benefit-tabs-icon"
                                        loading="lazy"
                                        decoding="async"
                                      />
                                      <h6>{item.productTabBenefitsItemText}</h6>
                                    </li>
                                  )
                                }
                              )}
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              </div>
            </div>
            <div className="container">
              <div className="tabs-section ml-margins">
                <div className="heading">
                  <h4>
                    <span className="brackets">Experience</span> Meltano
                  </h4>
                </div>

                {data.productTab.map(tab => (
                  <TabPanel key={tab.productTabNumber}>
                    {tab.productTabNumber === tabIndex + 1
                      ? tab.productTabExperienceContent.map(exp => (
                          <div
                            className={`tabs-container tabs-container-color-${exp.productTabExperienceContentColor}`}
                            key={exp.productTabExperienceContentNumber}
                          >
                            <div className="tabs-subheading">
                              <div className="tabs-subtitle">
                                <h4 className="brackets">
                                  {exp.productTabExperienceContentTitle}
                                </h4>
                                <p className="p1">
                                  {
                                    exp.productTabExperienceContentDescription
                                  }
                                </p>
                              </div>
                              <a
                                href={exp.productTabExperienceContentLink.url}
                                className="docs-link"
                                target={
                                  exp.productTabExperienceContentLink.target
                                }
                              >
                                <Image
                                  src={DocsIconDashboard}
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                                View docs
                              </a>
                            </div>

                            <Tabs>
                              <section className="tab-container">
                                <TabList className="tab-title tab-list">
                                  {exp.productTabExperienceContentTabs.map(
                                    button => (
                                      <Tab
                                        key={
                                          button.productTabExperienceContentTabNumber
                                        }
                                        className="tab-button"
                                        selectedClassName="tab_button-active"
                                      >
                                        {
                                          button.productTabExperienceContentTabTitle
                                        }
                                      </Tab>
                                    )
                                  )}
                                </TabList>
                                {exp.productTabExperienceContentTabs.map(
                                  content => (
                                    <TabPanel
                                      key={exp.productTabExperienceContentNumber}
                                    >
                                      <div className="tab-inside tab-inside-active">
                                        {content.productTabExperienceContentTabWindows.map(
                                          win => (
                                            <div
                                              className="tab-inside-column"
                                              key={
                                                win.productTabExperienceContentTabWindowContent
                                              }
                                            >
                                              <div className="tab-terminal">
                                                <div className="terminal-header">
                                                  <div className="terminal-header-circles">
                                                    <span className="red-bg" />
                                                    <span className="yellow-bg" />
                                                    <span className="green-bg" />
                                                  </div>
                                                  <span className="tab-terminal-title">
                                                    {
                                                      win.productTabExperienceContentTabWindowTitle
                                                    }
                                                  </span>
                                                  <span className="terminal-circle-clear" />
                                                </div>
                                                <div className="terminal-content">
                                                  <Highlight
                                                    theme={themes.oceanicNext}
                                                    code={win.productTabExperienceContentTabWindowContent
                                                      .slice(5)
                                                      .slice(0, -7)}
                                                    language={
                                                      win.productTabExperienceContentTabWindowLanguage
                                                    }
                                                  >
                                                    {({
                                                      className,
                                                      style,
                                                      tokens,
                                                      getLineProps,
                                                      getTokenProps,
                                                    }) => (
                                                      <pre
                                                        className={className}
                                                        style={style}
                                                      >
                                                        {tokens.map(
                                                          (line, i) => (
                                                            <div
                                                              {...getLineProps({
                                                                line,
                                                                key: i,
                                                              })}
                                                              style={
                                                                win.productTabExperienceContentTabWindowHighlight
                                                                  ?.split(',')
                                                                  .includes(
                                                                    (
                                                                      i + 1
                                                                    ).toString()
                                                                  )
                                                                  ? {
                                                                      background:
                                                                        'rgb(255 255 255 / 15%)',
                                                                    }
                                                                  : null
                                                              }
                                                            >
                                                              {line.map(
                                                                (token, key) => (
                                                                  <span
                                                                    {...getTokenProps(
                                                                      {
                                                                        token,
                                                                        key,
                                                                      }
                                                                    )}
                                                                  />
                                                                )
                                                              )}
                                                            </div>
                                                          )
                                                        )}
                                                      </pre>
                                                    )}
                                                  </Highlight>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </TabPanel>
                                  )
                                )}
                              </section>
                            </Tabs>
                          </div>
                        ))
                      : null}
                  </TabPanel>
                ))}

                <div className="tabs-subheading">
                  <div className="tabs-subtitle enjoy-tab">
                    <h4 className="brackets">Enjoy</h4>
                    <p className="p1">
                      Meltano is now syncing your data in production!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs

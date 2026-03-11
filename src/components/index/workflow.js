/* eslint-disable import/newline-after-import */
import React, { useState, useEffect, useRef } from 'react'
import { Highlight, Prism, themes } from 'prism-react-renderer'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import DashBreak1 from '../../assets/img/dash-break1.svg'
import DashBreak2 from '../../assets/img/dash-break2.svg'
import DashBreak3 from '../../assets/img/dash-break3.svg'
  ; (typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-python')
require('prismjs/components/prism-bash')

const Workflow = ({ data }) => {
  const [terminalView, setTerminalView] = useState({});
  const colors = ['pink', 'blue', 'yellow', 'green', 'pink']
  const separators = [DashBreak1, DashBreak2, DashBreak3, DashBreak2, DashBreak1, DashBreak2, DashBreak3, DashBreak2]

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    setTitle(data.workflowHeading)
    setDesc(data.workflowDescription)
  }, [])


  return (
    <ParallaxProvider>
      <div className="workflow section">
        <Parallax speed={50} className="workflow-bg" />
        <div className="container workflow-fr">
          <div className="heading">
            <h2
              className="title-inline"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              className="heading-description p2"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>

          {data.workflowArray.map((workflow, index) => (
            <div key={workflow.workflowTitle}>
              <div
                className={`workflow-section ml-margins workflow-${colors[index]}`}
              >
                <div
                  className={`workflow-info ${index % 2 ? 'workflow-left' : ''
                    }`}
                >
                  <h3 className="" dangerouslySetInnerHTML={{ __html: workflow.workflowTitle }} />{workflow.workflowTitle}
                  <h5>{workflow.workflowSubtitle}</h5>
                  <ul className="workflow-list">
                    {workflow.workflowTextArray.map(text => (
                      <li key={text.workflowText}>{text.workflowText}</li>
                    ))}
                  </ul>
                  <div className="workflow-buttons">
                    {workflow.workflowButtonArray.map(button => (
                      <a
                        href={button.workflowButton.url}
                        className="btn colorful-btn"
                        target={button.workflowButton.target}
                        key={button.workflowButton.url}
                      >
                        <span />
                        {button.workflowButton.title}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="workflow-terminal tabsToggle">
                  {workflow.workflowWindowContent && (workflow.workflowUiVideo?.mediaItemUrl || workflow.workflowUiImage?.mediaItemUrl) &&
                    (
                      <div className="toggle-container">
                        <button
                          className={`toggle-btn ${(terminalView[index] || "ui") === "ui" || !terminalView[index]
                            ? "active"
                            : ""
                            }`}
                          onClick={() =>
                            setTerminalView(prev => ({
                              ...prev,
                              [index]: "ui",
                            }))
                          }
                        >
                          UI VIEW
                          <svg xmlns="http://www.w3.org/2000/svg" width="32.052" height="29.595" viewBox="0 0 32.052 29.595">
                            <path id="Path_5" data-name="Path 5" d="M88.136,29.6h32.052a8,8,0,0,1-7.367-4.88l-8.4-19.835A8,8,0,0,0,97.055,0H88.136Z" transform="translate(-88.136)" fill="#221937" />
                          </svg>
                        </button>

                        <button
                          className={`toggle-btn ${terminalView[index] === "local" ? "active" : ""
                            }`}
                          onClick={() =>
                            setTerminalView(prev => ({
                              ...prev,
                              [index]: "local",
                            }))
                          }
                        >
                          TERMINAL
                          <svg xmlns="http://www.w3.org/2000/svg" width="32.052" height="29.595" viewBox="0 0 32.052 29.595">
                            <path id="Path_5" data-name="Path 5" d="M88.136,29.6h32.052a8,8,0,0,1-7.367-4.88l-8.4-19.835A8,8,0,0,0,97.055,0H88.136Z" transform="translate(-88.136)" fill="#221937" />
                          </svg>
                        </button>
                      </div>
                    )
                  }
                  {
                    terminalView[index] === "local" || (!workflow.workflowUiVideo?.mediaItemUrl && !workflow.workflowUiImage?.mediaItemUrl) ? (
                      <div className="tab-terminal">
                        {
                          workflow?.workflowWindowTitle && (
                            <div className="terminal-header">
                              <div className="terminal-header-circles">
                                <span className="red-bg" />
                                <span className="yellow-bg" />
                                <span className="green-bg" />
                              </div>
                              <span className="tab-terminal-title">
                                {workflow.workflowWindowTitle}
                              </span>
                              <span className="terminal-circle-clear" />
                            </div>
                          )
                        }
                        {/* <div className="terminal-header">
                          <div className="terminal-header-circles">
                            <span className="red-bg" />
                            <span className="yellow-bg" />
                            <span className="green-bg" />
                          </div>
                          <span className="tab-terminal-title">
                            {workflow.workflowWindowTitle}
                          </span>
                          <span className="terminal-circle-clear" />
                        </div> */}
                        <div className="terminal-content">
                          <Highlight
                            theme={themes.oceanicNext}
                            code={workflow.workflowWindowContent
                              .slice(5)
                              .slice(0, -7)}
                            language={workflow.workflowWindowLanguage}
                          >
                            {({
                              className,
                              style,
                              tokens,
                              getLineProps,
                              getTokenProps,
                            }) => (
                              <pre className={className} style={style}>
                                {tokens.map((line, i) => (
                                  <div {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                      <span {...getTokenProps({ token, key })} />
                                    ))}
                                  </div>
                                ))}
                              </pre>
                            )}
                          </Highlight>
                        </div>
                      </div>
                    ) : (
                      <div className="video-ui-tab">
                        <div
                          className={`video-wrapper ${workflow.workflowVideoOrImage === "ui_image" && "imgBox"
                            }`}
                        >
                          {workflow.workflowVideoOrImage === "ui_video" &&
                            workflow.workflowUiVideo?.mediaItemUrl && (
                              <div>
                                <video
                                  src={workflow.workflowUiVideo.mediaItemUrl}
                                  controls
                                  playsInline
                                  width="100%"
                                  height="100%"
                                />
                              </div>
                            )}

                          {workflow.workflowVideoOrImage === "ui_image" &&
                            workflow.workflowUiImage?.mediaItemUrl && (
                              <img
                                src={workflow.workflowUiImage.mediaItemUrl}
                                alt={workflow.workflowTitle}
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                              />
                            )}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="workflow-separator">
                <img src={separators[index]} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParallaxProvider>
  )
}

export default Workflow

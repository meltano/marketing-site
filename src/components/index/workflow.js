/* eslint-disable import/newline-after-import */
import React, { useState, useEffect, useRef } from 'react'
import { Highlight, Prism, themes } from 'prism-react-renderer'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import DashBreak1 from '../../assets/img/dash-break1.svg'
import DashBreak2 from '../../assets/img/dash-break2.svg'
import DashBreak3 from '../../assets/img/dash-break3.svg'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-python')
require('prismjs/components/prism-bash')

const Workflow = ({ data }) => {
  const colors = ['pink', 'blue', 'yellow', 'green']
  const separators = [DashBreak1, DashBreak2, DashBreak3, DashBreak2]

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
                  className={`workflow-info ${
                    index % 2 ? 'workflow-left' : ''
                  }`}
                >
                  <h3 className="brackets">{workflow.workflowTitle}</h3>
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
                <div className="workflow-terminal">
                  <div className="tab-terminal">
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

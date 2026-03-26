import React, { useState } from 'react'
import Link from '@/components/compat/GatsbyLink'

const CostComparison = ({ data }) => {
  const tabs = data?.costCategoryTabs || []
  const [activeTab, setActiveTab] = useState(0)

  const connectors = tabs[activeTab]?.costConnectors || []

  const totalOurPrice = connectors.reduce((sum, item) => sum + item.ourPrice, 0)
  const totalCompetitorPrice = connectors.reduce(
    (sum, item) => sum + item.competitorPrice,
    0
  )

  const savings = (totalCompetitorPrice - totalOurPrice).toFixed(2);

  return (
    <section className="costComparison centerLarge">
      <div className="container">
        <div className="row ml-margins">
          <div className="tabsToggle">
            <div className="heading">
              <h2 className="title-inline">Pricing grounded in reality.</h2>
              <p className="heading-description p2">
                Usage-based pricing means cost follows data volume. See median monthly usage and per-connector costs from <br></br>actual customer workloads.
              </p>
            </div>
            <div className='btnGroup'>
                <div className="toggle-container">
                {tabs.map((tab, index) => (
                    <button
                    key={index}
                    className={`toggle-btn ${
                        activeTab === index ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(index)}
                    >
                    {tab.categoryTabTitle}
                    </button>
                ))}
                </div>
            </div>

            <div className="toggleContent">
              <div className="toggleContentInner">
                {/* Table */}
                <table className="cost-comparison__table">
                  <thead>
                    <tr>
                      <th>Example connectors</th>
                      <th>Our price</th>
                      <th>Competitors price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connectors.map((item, i) => (
                      <tr key={i} className="cost-comparison__row">
                        <td className="cost-comparison__connector">
                          <span className="company">
                            <span className="logoIcon">
                              <img
                                className="cost-comparison__logo"
                                src={item.connectorLogo?.mediaItemUrl}
                                alt={item.connectorName}
                              />
                            </span>
                            {item.connectorName}
                          </span>
                        </td>
                        <td className="cost-comparison__our-price">
                          ${item.ourPrice}
                        </td>
                        <td className="cost-comparison__competitor-price">
                          ${item.competitorPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Footer */}
                            <div className="bottomText">
                                <p className="leftText">
                                    All estimates are based on our standard plan and estimated with a
                                    company with 1-200 employees.
                                </p>
                                <p className="rightText">
                                    <span className="cost-comparison__total">
                                        Total cost: ${totalCompetitorPrice}
                                    </span>
                                    <span className="cost-comparison__saving">
                                        Total savings: ${savings}
                                    </span>
                                </p>
                            </div>
              </div>
            </div>
            <div className="btnBox">
              <Link
                to={`https://meetings.hubspot.com/aphethean/45-min-demo-meeting?uuid=ff906b81-7e0b-4c2d-ad44-cc654abd18d8`}
                className="btn alt-blue-btn middle"
              >
                <span></span>
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CostComparison

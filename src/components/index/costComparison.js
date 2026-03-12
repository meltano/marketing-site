import React, { useState } from "react"
import { Link } from "gatsby"

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
        <section className="costComparison">
            <div className="container">
                {/* LEFT */}
                <div className="row ml-margins">
                <div className="tabsToggle">
                    {/* Tabs */}
                    <div className="toggle-container">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`toggle-btn smBtn ${activeTab === index
                                        ? "active"
                                        : ""
                                    }`}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab.categoryTabTitle}
                                <svg xmlns="http://www.w3.org/2000/svg" width="32.052" height="29.595" viewBox="0 0 32.052 29.595">
                                    <path id="Path_5" data-name="Path 5" d="M88.136,29.6h32.052a8,8,0,0,1-7.367-4.88l-8.4-19.835A8,8,0,0,0,97.055,0H88.136Z" transform="translate(-88.136)" fill="#221937" />
                                </svg>
                            </button>
                        ))}
                    </div>
                    {/* Table */}
                    <div className="toggleContent">
                        <div className="toggleContentInner">
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
                                    All estimates are based on our standard plan and <br/>estimated with a
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
                            className="colorful-btn btn"
                        ><span></span>
                                Book a demo
                        </Link>
                    </div>
                </div>
                {/* RIGHT SIDE */}
                <div className="titleBlock">
                    <h2>
                            The same <em>connectors</em> <br></br>30 to 40% less cost.
                    </h2>
                    <Link
                            to={`https://meetings.hubspot.com/aphethean/45-min-demo-meeting?uuid=ff906b81-7e0b-4c2d-ad44-cc654abd18d8`}
                        className="colorful-btn btn"
                    ><span></span>
                       Book a demo
                    </Link>
                </div>
                </div>
            </div>
        </section>
    )
}
export default CostComparison
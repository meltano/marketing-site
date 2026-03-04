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

    const savings = totalCompetitorPrice - totalOurPrice

    return (
        <section className="cost-comparison ">

            <div className="cost-comparison__container">

                {/* LEFT */}
                <div className="cost-comparison__table-box">

                    {/* Tabs */}
                    <div className="cost-comparison__tabs">

                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`cost-comparison__tab ${activeTab === index
                                        ? "cost-comparison__tab--active"
                                        : ""
                                    }`}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab.categoryTabTitle}
                            </button>
                        ))}

                    </div>

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

                                        <img
                                            className="cost-comparison__logo"
                                            src={item.connectorLogo?.mediaItemUrl}
                                            alt={item.connectorName}
                                        />

                                        {item.connectorName}

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
                    <div className="cost-comparison__footer">

                        <p className="cost-comparison__note">
                            All estimates are based on our standard plan and estimated with a
                            company with 1-200 employees.
                        </p>

                        <div className="cost-comparison__totals">

                            <p className="cost-comparison__total">
                                Total cost: ${totalCompetitorPrice}
                            </p>

                            <p className="cost-comparison__saving">
                                Total savings: ${savings}
                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="cost-comparison__cta">

                    <h2 className="cost-comparison__title">
                        Know your cost
                    </h2>

                    <Link
                        to={data?.costCompareLink || "#"}
                        className="cost-comparison__button"
                    >
                        Try the pricing calculator
                    </Link>

                </div>

            </div>

        </section>
    )
}

export default CostComparison
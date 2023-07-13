import React from 'react'

const PriceTable = ({ data }) => (
  <div className="prices">
    <div className="container">
      <div className="price-table">
        {data.pricingTableItem.map((table, i) => (
          <div
            className={`price-table-item ${
              i === 0 ? 'price-table-free' : 'price-table-cloud'
            }`}
            key={table.pricingTableItemTitle}
          >
            <div className="price-table-top">
              <div className="price-table-head">
                <div className="price-table-head-wrap price-table-head-title">
                  <h4>{table.pricingTableItemTitle}</h4>
                </div>
                <div className="price-table-head-wrap price-table-head-image">
                  <img
                    src={table.pricingTableItemIcon.localFile.publicURL}
                    alt={table.pricingTableItemTitle}
                  />
                </div>
              </div>
              <div className="cloud-table-header-wrap">
                <div className="cloud-table-header-labels">
                  <div className="blue-label-btn">
                    <a href="/contact" target="_blank">
                      <div className="blue-label-btn-title">
                        <h3>{table.pricingTableItemTier}</h3>
                      </div>
                    </a>
                  </div>
                  {/* <div className="blue-label-btn">
                    <div className="blue-label-btn-title">
                      <div>½ credit</div>
                    </div>
                    <div className="blue-label-btn-subtitle">
                      per hourly run
                    </div>
                  </div> */}
                </div>
                <p className="p2">{table.pricingTableItemDescription}</p>
                {/* <a
                  href="https://meltano.com/cost-calculator "
                  className="calculate-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Calculate your cost
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                  >
                    <path
                      d="M1 6.5C0.447717 6.5 2.5034e-06 6.94772 2.5034e-06 7.5C2.5034e-06 8.05228 0.447717 8.5 1 8.5V6.5ZM17.7071 8.20711C18.0976 7.81658 18.0976 7.18342 17.7071 6.79289L11.3431 0.42895C10.9526 0.0384264 10.3194 0.0384264 9.92891 0.42895C9.53839 0.819473 9.53839 1.45264 9.92891 1.84316L15.5857 7.5L9.92891 13.1568C9.53839 13.5474 9.53839 14.1805 9.92891 14.5711C10.3194 14.9616 10.9526 14.9616 11.3431 14.5711L17.7071 8.20711ZM1 8.5H17V6.5H1V8.5Z"
                      fill="#18C3FA"
                    />
                  </svg>
                </a> */}
              </div>
              <div
                className={
                  i === 0 ? `open-source-btn` : `open-source-btn coming-soon`
                }
              >
                <div className="blue-label-btn">
                  <div className="blue-label-btn-title">
                    <h3>{table.pricingTableItemTier}</h3>
                  </div>
                </div>
              </div>
              <p className="p2">{table.pricingTableItemDescription}</p>
            </div>
            <ul className="prices-list">
              {table.pricingTableItemList.map(item => (
                <li
                  className="purple-checkmark"
                  key={item.pricingTableItemListItem}
                >
                  <p
                    className="p3"
                    dangerouslySetInnerHTML={{
                      __html: item.pricingTableItemListItem,
                    }}
                  />
                </li>
              ))}
            </ul>
            <a
              href={table.pricingTableItemLink.url}
              target={table.pricingTableItemLink.target}
              className="btn alt-blue-btn"
            >
              {table.pricingTableItemLink.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default PriceTable

import React from 'react'

const ManageConnector = ({ table }) => (
  <div className="price-table">
    <div
      className="price-table-item price-table-connectors"
      key={table.pricingTableItemTitle}
    >
      <div className="price-table-top-row">
        <div className="price-table-head">
          <div className="price-table-head-wrap price-table-head-title">
            <h4>{table.pricingTableItemTitle}</h4>
          </div>
        </div>
        <div className="price-table-head price-table-second-row">
          <div className="price-table-head-wrap price-table-head-title">
            <p className="p2">{table.pricingTableItemDescription}</p>
          </div>
          <div className="price-table-head-wrap price-table-head-title button-wrap">
            <a
              href={table.pricingTableItemLink.url}
              target={table.pricingTableItemLink.target}
              className="btn alt-blue-btn"
            >
              {table.pricingTableItemLink.title}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ManageConnector

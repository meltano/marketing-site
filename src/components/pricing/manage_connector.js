import React from 'react'

const ManageConnector = ({ table }) => (
  <div className="price-table">
    <div
      className="price-table-item price-table-connectors"
      key={table.pricingTableItemTitle}
      
    >
      <div className="price-table-two-column">
        <div className="price-table-first-col">
            <h4>{table.pricingTableItemTitle}</h4>
            <p className="p2">{table.pricingTableItemDescription}</p>
        </div>
        <div className="price-table-second-col"
        style={{ backgroundImage: `url(${table.pricingTableItemIcon.localFile.publicURL})` }}>
            <a
              href={table.pricingTableItemLink.url}
              target={table.pricingTableItemLink.target}
              className="btn alt-blue-btn"
            >
              {/* {table.pricingTableItemLink.title} */}Check out Matatika
            </a>
        </div>
      </div>
    </div>
  </div>
)

export default ManageConnector

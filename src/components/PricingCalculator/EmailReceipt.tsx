import React from 'react'

interface ConnectorCost {
  name: string
  frequency?: string
  cost: number
}

interface Connector {
  id: string
  name: string
  logo?: string
  frequency: '15min' | 'hourly' | 'daily'
  numberOfRows: number
  pricePerMinute: number
  competitorPricePerMinute: number
}

interface EmailReceiptProps {
  connectors: Connector[]
  connectorCosts: ConnectorCost[]
  totalCost: number
  competitorTotal?: number
  savings?: number
}

export default function EmailReceipt({
  connectors,
  connectorCosts,
  totalCost,
  competitorTotal,
  savings,
}: EmailReceiptProps) {
  return (
    <div className="receipt-container">
      <h2 className="receipt-title">Pricing Receipt</h2>
      <div className="receipt-summary">
        <div>
          <strong>Total Your Price:</strong> ${totalCost.toFixed(2)}
        </div>
        {competitorTotal !== undefined && (
          <div>
            <strong>Competitor Total:</strong> ${competitorTotal.toFixed(2)}
          </div>
        )}
        {savings !== undefined && (
          <div>
            <strong>Total Savings:</strong> ${savings.toFixed(2)}
          </div>
        )}
      </div>

      <div className="receipt-breakdown">
        <div className="receipt-header">
          <span>Connector</span>
          <span>Frequency</span>
          <span>Rows / Month</span>
          <span>Cost</span>
        </div>

        {connectorCosts.map((item, index) => {
          const connector = connectors.find((c) => c.name === item.name)

          return (
            <div className="receipt-row" key={index}>
              <div className="receipt-connector">
                {connector?.logo && (
                  <img
                    src={connector.logo}
                    alt={item.name + ' logo'}
                    className="receipt-logo"
                  />
                )}
                <span>{item.name}</span>
              </div>
              <span>{item.frequency || '-'}</span>
              <span>
                {connector
                  ? connector.numberOfRows.toLocaleString()
                  : '—'}
              </span>
              <span>${item.cost.toFixed(2)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
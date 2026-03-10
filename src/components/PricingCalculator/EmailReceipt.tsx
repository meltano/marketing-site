import React, { useState } from 'react'

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
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
  const emailApiUrl ="https://laserdigital.cskills.me/wp-json/api/v1/send-email"
    
    const emailPayload = {
        totalPrice: totalCost,
        competitorTotal,
        totalSavings: savings,

        connectors: connectors.map((connector, index) => ({
            id: connector.id,
            name: connector.name,
            logo: connector.logo || "",
            frequency: connector.frequency,
            rowsPerMonth: connector.numberOfRows,
            cost: connectorCosts[index]?.cost || 0
        }))
    }

  const sendEmailReceipt = async () => {
    if (!email) {
      alert("Please enter email")
      return
    }

    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email")
      return
    }

    setLoading(true)

    try {
      if (!emailApiUrl) {
        throw new Error("Missing GATSBY_EMAIL_API_URL")
      }

      const res = await fetch(
        emailApiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY":"b9f7c1a8e4d3f92a6c7e5d1b8a3f0c9d"
          },
          body: JSON.stringify({
            ...emailPayload,
            toEmail: email
          })
        }
      )

      const data = await res.json()

      console.log("Email sent", data)

      alert("Receipt sent successfully!")

    } catch (error) {
      console.error(error)
      alert("Failed to send email")
    }

    setLoading(false)
  }

  return (
    <div className="receipt-container">
      <h2 className="receipt-title">Pricing Receipt</h2>
          {/* EMAIL INPUT */}
          <div className="email-send-box">

              <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="receipt-email-input"
              />

              <button
                  onClick={sendEmailReceipt}
                  disabled={loading}
                  className="receipt-send-btn"
              >
                  {loading ? "Sending..." : "Send Email"}
              </button>

          </div>
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

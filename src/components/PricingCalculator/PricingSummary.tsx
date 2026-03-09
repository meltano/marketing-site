import { Card } from './ui/card'
import { Separator } from './ui/separator'
import * as React from 'react'


interface ConnectorCost {
  name: string
  frequency: string
  cost: number
}

interface PricingSummaryProps {
  connectorCosts: ConnectorCost[]
  totalCost: number
  competitorTotal: number
  savings: number
}

export default function PricingSummary({
  connectorCosts,
  totalCost,
  competitorTotal,
  savings,
}: PricingSummaryProps) {

  const [comparison, setComparison] = React.useState("none")
  const [isAnnual, setIsAnnual] = React.useState(false)

  return (
    <Card className="p-6 space-y-6">
      {/* Our Price */}
      <div className="compareCheck">
        <div className="compareWrapper">
          <span className="compareLabel">Compare with:</span>

          <div className="radioGroup">
            <label className="radioCard">
              <input
                type="radio"
                name="compare"
                value="none"
                checked={comparison === "none"}
                onChange={(e) => setComparison(e.target.value)}
              />
              <span className="radioContent">
                <span className="radioCircle"></span>
                No Comparison
              </span>
            </label>

            <label className="radioCard">
              <input
                type="radio"
                name="compare"
                value="fivetran"
                checked={comparison === "fivetran"}
                onChange={(e) => setComparison(e.target.value)}
              />
              <span className="radioContent">
                <span className="radioCircle"></span>
                Fivetran
              </span>
            </label>

          </div>
        </div>
      </div>
      <div>
        <h4
          className="text-4xl font-bold tabular-nums totalCost"
          data-testid="text-total-cost"
        >
          
                  <>
                    ${isAnnual ? (totalCost * 12).toFixed(2) : totalCost.toFixed(2)}
                    <span>
                      {isAnnual ? " / Annual" : " / Monthly"}
                    </span>
                  </>
                
        </h4>
      </div>

      {/* Competitor Comparison */}
      {connectorCosts.length > 0 && (
        <>
          <Separator />

          <div>
            <h6 className="breakdownTitle mb-3">
              Cost Summary
              <label className="toggleSwitch nolabel">
                <input
                  type="checkbox"
                  checked={isAnnual}
                  onChange={() => setIsAnnual(!isAnnual)}
                />
                <a></a>
                <span>
                  <span className="left-span">Monthly</span>
                  <span className="right-span">Annual</span>
                </span>
              </label>
            </h6>

            {connectorCosts.map((item, index) => (
              <div
                key={index}
                className="breakdownItem flex justify-between mb-2"
              >
                <div>
                  <p>{item.name}</p>
                  <p>
                    <small>{item.frequency}</small>
                  </p>
                </div>

                <p className="tabular-nums">
                  $
                  {isAnnual
                    ? (item.cost * 12).toFixed(2)
                    : item.cost.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <Separator />

      
      {comparison === "fivetran" && (
          <div className="comparisonPrice">
            <p className="compareComp">
              <span className="text-muted-foreground">Fivetran Charges</span>
              <span className="tabular-nums"><span>${competitorTotal.toFixed(2)}</span> / month</span>
            </p>

            <p className="totalSave">
              <span>Total Saved</span>
              <span className="tabular-nums"><span>${savings.toFixed(2)}</span> / month</span>
            </p>
          </div>
      )}

    </Card>
  )
}

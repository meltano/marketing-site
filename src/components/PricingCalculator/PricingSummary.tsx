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
  savings
}: PricingSummaryProps) {

  return (
    <Card className="p-6 space-y-6">

      {/* Our Price */}
      <div>
        <p className="margin-unset text-muted-foreground">
          Monthly Total
        </p>

        <h4
          className="text-4xl font-bold tabular-nums"
          data-testid="text-total-cost"
        >
          ${totalCost.toFixed(2)}
        </h4>
      </div>


      {/* Competitor Comparison */}
      <div className="space-y-2">

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Competitor Price
          </span>

          <span className="tabular-nums">
            ${competitorTotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between font-semibold text-green-500">
          <span>Total Saved</span>

          <span className="tabular-nums">
            ${savings.toFixed(2)}
          </span>
        </div>

      </div>


      {connectorCosts.length > 0 && (
        <>
          <Separator />

          <div>

            <h6 className="breakdownTitle mb-3">
              Breakdown
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

                <p
                  className="tabular-nums"
                  data-testid={`text-cost-${index}`}
                >
                  ${item.cost.toFixed(2)}
                </p>

              </div>

            ))}

          </div>
        </>
      )}

      <Separator />

      <div className="text-xs text-muted-foreground">
        Pricing based on connector runtime minutes per month
      </div>

    </Card>
  )
}
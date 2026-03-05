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
}

export default function PricingSummary({
  connectorCosts,
  totalCost,
}: PricingSummaryProps) {
  return (
    <Card>
        <div>
          <p className="margin-unset">
            Monthly Total
          </p>
          <h4
            className="text-4xl font-bold tabular-nums"
            data-testid="text-total-cost"
          >
            ${totalCost.toFixed(2)}
          </h4>
        </div>

        {connectorCosts.length > 0 && (
          <>
            <Separator />
            <div>
              <h6 className="breakdownTitle">
                Breakdown
              </h6>
              {connectorCosts.map((item, index) => (
                <div
                  key={index}
                  className="breakdownItem"
                >
                  <div>
                    <p>
                      {item.name}
                    </p>
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

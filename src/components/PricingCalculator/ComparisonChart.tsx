import { Card } from './ui/card'
import * as React from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { CheckCircle2 } from 'lucide-react'

interface ComparisonChartProps {
  timeBasedPrice: number
  rowBasedPrice: number
  numberOfRows: number
}

export default function ComparisonChart({
  timeBasedPrice,
  rowBasedPrice,
  numberOfRows,
}: ComparisonChartProps) {
  const savings = rowBasedPrice - timeBasedPrice
  const savingsPercentage = ((savings / rowBasedPrice) * 100).toFixed(0)

  const data = [
    {
      name: 'Time-Based\n(Your Price)',
      value: timeBasedPrice,
      fill: 'hsl(var(--chart-1))',
    },
    {
      name: 'Row-Based\n(Competitor)',
      value: rowBasedPrice,
      fill: 'hsl(var(--muted))',
    },
  ]

  return (
    <Card className="comparisonChart">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Pricing Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Compare our time-based pricing with traditional row-based pricing
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={0}
              textAnchor="middle"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={value => `$${value}`}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {savings > 0 && (
          <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div
                className="font-semibold text-primary"
                data-testid="text-savings"
              >
                Save ${savings.toFixed(2)}/month ({savingsPercentage}%)
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Based on {numberOfRows.toLocaleString()} active rows/month with
                traditional row-based pricing
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

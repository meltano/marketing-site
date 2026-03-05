import React, { useState } from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Plus } from 'lucide-react'
import ConnectorCard, { type Connector } from './ConnectorCard'
import PricingSummary from './PricingSummary'
import ComparisonChart from './ComparisonChart'
import EmbedCode from './EmbedCode'

export default function PricingCalculator() {
  const [connectors, setConnectors] = useState<Connector[]>([
    { id: '1', name: 'Salesforce', frequency: 'hourly', numberOfRows: 1000000 },
  ])
  const [showComparison, setShowComparison] = useState(false)

  const addConnector = () => {
    if (connectors.length >= 10) return
    const newConnector: Connector = {
      id: Date.now().toString(),
      name: 'Salesforce',
      frequency: 'hourly',
      numberOfRows: 1000000,
    }
    setConnectors([...connectors, newConnector])
  }

  const removeConnector = (id: string) => {
    setConnectors(connectors.filter(c => c.id !== id))
  }

  const updateConnector = (id: string, updates: Partial<Connector>) => {
    setConnectors(connectors.map(c => (c.id === id ? { ...c, ...updates } : c)))
  }

  const calculateMinutesPerSync = (rows: number): number => {
    return Math.max(1, Math.round(rows / 10000))
  }

  const calculateMonthlyCost = (
    frequency: Connector['frequency'],
    minutesPerSync: number
  ): number => {
    const runsPerMonth = {
      '15min': 2880,
      hourly: 720,
      daily: 30,
    }
    const totalMinutes = runsPerMonth[frequency] * minutesPerSync
    return totalMinutes * 0.05
  }

  const connectorCosts = connectors.map(connector => {
    const minutesPerSync = calculateMinutesPerSync(connector.numberOfRows)
    return {
      name: connector.name,
      frequency:
        connector.frequency === '15min'
          ? 'Every 15min'
          : connector.frequency === 'hourly'
          ? 'Hourly'
          : 'Daily',
      cost: calculateMonthlyCost(connector.frequency, minutesPerSync),
    }
  })

  const totalCost = connectorCosts.reduce((sum, item) => sum + item.cost, 0)

  // Categorize connectors as API or Database
  const apiConnectors = [
    'Salesforce',
    'HubSpot',
    'SAP',
    'NetSuite',
    'Zendesk',
    'Jira',
  ]
  const databaseConnectors = [
    'Postgres',
    'MySQL',
    'MongoDB',
    'Snowflake',
    'BigQuery',
    'Redshift',
    'DynamoDB',
    'Oracle',
  ]

  // Calculate traditional row-based pricing: 5x for API, 3x for Database
  const rowBasedPrice = connectors.reduce((sum, connector) => {
    const connectorCost =
      connectorCosts.find(cc => cc.name === connector.name)?.cost || 0
    const isApiConnector = apiConnectors.includes(connector.name)
    const multiplier = isApiConnector ? 5 : 3
    return sum + connectorCost * multiplier
  }, 0)

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8 pricingCalc">

      <div className="container">
        <div className="text-center mb-8">
          <div className="heading">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Pricing Calculator
            </h2>
            <p className="heading-description p2">
              Calculate your monthly cost based on connector usage time
            </p>
          </div>
        </div>

        <div className="calcSection">
          <div className="leftSide">
            <div className="space-y-4">
              <div className="leftSideTitle">
                <h5>
                  Connectors
                </h5>
                {connectors.length < 10 && (
                  <Button
                    onClick={addConnector}
                    size="sm"
                    data-testid="button-add-connector"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Connector
                  </Button>
                )}
              </div>

              {connectors.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground mb-4">
                    Add your first connector to get started
                  </p>
                  <Button
                    onClick={addConnector}
                    data-testid="button-add-first-connector"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Connector
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {connectors.map(connector => (
                    <ConnectorCard
                      key={connector.id}
                      connector={connector}
                      onRemove={removeConnector}
                      onUpdate={updateConnector}
                    />
                  ))}
                  {connectors.length >= 10 && (
                    <p className="text-sm text-muted-foreground text-center">
                      Maximum 10 connectors reached
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="compareSolution">
              <div>
                <Label
                  htmlFor="comparison-toggle"
                  className="text-base font-medium cursor-pointer"
                >
                  Compare with existing solutions
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  See how we compare to traditional row-based pricing
                </p>
              </div>
              <Switch
                id="comparison-toggle"
                checked={showComparison}
                onCheckedChange={setShowComparison}
                data-testid="switch-comparison"
              />
            </div>

            {showComparison && (
              <ComparisonChart
                timeBasedPrice={totalCost}
                rowBasedPrice={rowBasedPrice}
                numberOfRows={connectors.reduce(
                  (sum, c) => sum + c.numberOfRows,
                  0
                )}
              />
            )}

            {/* <EmbedCode /> */}
          </div>

          <div className="rightSide">
            <PricingSummary
              connectorCosts={connectorCosts}
              totalCost={totalCost}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

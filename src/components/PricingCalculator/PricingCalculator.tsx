import React, { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Plus } from 'lucide-react'
import ConnectorCard, { type Connector } from './ConnectorCard'
import PricingSummary from './PricingSummary'
import ComparisonChart from './ComparisonChart'
import EmbedCode from './EmbedCode'

const CONNECTORS = [
  'Salesforce', 'HubSpot', 'Postgres', 'MySQL', 'MongoDB',
  'Snowflake', 'BigQuery', 'Redshift', 'DynamoDB', 'Oracle',
  'SAP', 'NetSuite', 'Zendesk', 'Jira',
] 

export default function PricingCalculator() {
  const [connectors, setConnectors] = useState<Connector[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [showPickerDropdown, setShowPickerDropdown] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showPickerDropdown) return
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPickerDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showPickerDropdown])

  const handleAddConnectorClick = () => {
    if (connectors.length >= 10) return
    setShowPickerDropdown(true)
  }

  const handlePickConnector = (name: string) => {
    const newConnector: Connector = {
      id: Date.now().toString(),
      name,
      frequency: 'hourly',
      numberOfRows: 1000000,
    }
    setConnectors(prev => [...prev, newConnector])
    setShowPickerDropdown(false)
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

  const apiConnectors = ['Salesforce', 'HubSpot', 'SAP', 'NetSuite', 'Zendesk', 'Jira']

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
        <div className="row calcSection">
          <div className="leftSide">
            <div className="heading">
              <h2 className="title-inline">
                Pricing Calculator
              </h2>
              <p className="heading-description p2">
                Calculate your monthly cost based on connector usage time
              </p>
            </div>
            <div className="connectorBoxes">
              <div className="leftSideTitle">
                <h5>Connectors</h5>
                {connectors.length < 10 && (
                  <div ref={pickerRef} style={{ position: 'relative', display: 'inline-block' }}>
                    <Button
                      onClick={handleAddConnectorClick}
                      size="sm"
                      data-testid="button-add-connector"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Connector
                    </Button>
                    {showPickerDropdown && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          marginTop: '4px',
                          background: 'var(--popover, #1a1a2e)',
                          border: '1px solid var(--border, rgba(255,255,255,0.1))',
                          borderRadius: '8px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                          zIndex: 50,
                          minWidth: '180px',
                          padding: '4px',
                        }}
                      >
                        {CONNECTORS.map(name => (
                          <button
                            key={name}
                            onClick={() => handlePickConnector(name)}
                            style={{
                              display: 'block',
                              width: '100%',
                              textAlign: 'left',
                              padding: '8px 12px',
                              fontSize: '14px',
                              background: 'transparent',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              color: 'var(--foreground, #fff)',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                            }}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {connectors.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground mb-4">
                    Add your first connector to get started
                  </p>
                  <Button
                    onClick={handleAddConnectorClick}
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

            </div>
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
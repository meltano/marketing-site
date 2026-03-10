import React, { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Plus } from 'lucide-react'
import ConnectorCard, { type Connector } from './ConnectorCard'
import PricingSummary from './PricingSummary'
import ComparisonChart from './ComparisonChart'
import EmbedCode from './EmbedCode'
import ReceiptModal from './ReceiptModal'
export default function PricingCalculator(data: any) {

  const [connectors, setConnectors] = useState<Connector[]>([])

  const [showComparison, setShowComparison] = useState(false)
  const [showPickerDropdown, setShowPickerDropdown] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)

  const pickerRef = useRef<HTMLDivElement>(null)

  // console.log("Data in the pricing calculator component", data)

  const CONNECTORS = data?.data || []

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


  const handlePickConnector = (connector: any) => {

    const newConnector: Connector = {
      id: Date.now().toString(),
      name: connector.connectorName,
      logo: connector.connectorLogo?.mediaItemUrl || "",
      pricePerMinute: Number(connector.pricePerMinute) || 0.05,
      competitorPricePerMinute: Number(connector.competitorPricePerMinute) || 0.12,
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
    minutesPerSync: number,
    pricePerMinute: number
  ): number => {

    const runsPerMonth = {
      '15min': 2880,
      hourly: 720,
      daily: 30,
    }

    const totalMinutes = runsPerMonth[frequency] * minutesPerSync

    if (!pricePerMinute) return 0

    return totalMinutes * pricePerMinute
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

      cost: calculateMonthlyCost(
        connector.frequency,
        minutesPerSync,
        connector.pricePerMinute
      ),
    }

  })


  const competitorConnectorCosts = connectors.map(connector => {

    const minutesPerSync = calculateMinutesPerSync(connector.numberOfRows)

    return {
      name: connector.name,
      cost: calculateMonthlyCost(
        connector.frequency,
        minutesPerSync,
        connector.competitorPricePerMinute
      ),
    }

  })


  const totalCost = connectorCosts.reduce((sum, item) => sum + item.cost, 0)


  const competitorTotal = competitorConnectorCosts.reduce(
    (sum, item) => sum + item.cost,
    0
  )


  const totalSavings = competitorTotal - totalCost


  const apiConnectors = [
    'Salesforce',
    'HubSpot',
    'SAP',
    'NetSuite',
    'Zendesk',
    'Jira'
  ]


  const rowBasedPrice = connectors.reduce((sum, connector) => {

    const connectorCost =
      connectorCosts.find(cc => cc.name === connector.name)?.cost || 0

    const isApiConnector = apiConnectors.includes(connector.name)

    const multiplier = isApiConnector ? 5 : 3

    return sum + connectorCost * multiplier

  }, 0)


  return (
    <div className="glow-bg min-h-screen bg-background p-4 md:p-6 lg:p-8 pricingCalc">

      <div className="container">

        <div className="row calcSection ml-margins">

          <div className="leftSide">

            <div className="heading">
              <h2 className="title-inline">Pricing Calculator</h2>
              <p className="heading-description p2">
                Calculate your monthly cost based on connector usage time
              </p>
              <h6>Calculate Your Data Pipeline Costs</h6>
              <p className='heading-description p2'>Select your data sources and configure sync settings to see transparent pricing</p>
            </div>

            <div className="connectorBoxes">

              <div className="leftSideTitle">

                <h5>Connectors</h5>

                {connectors.length < 10 && (

                  <div className='topAddConnection' ref={pickerRef}>
                    <Button
                      onClick={handleAddConnectorClick}
                      size="sm"
                      data-testid="button-add-connector"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Connector
                    </Button>
                    {showPickerDropdown && (
                      <div className='connectorList' >
                        {CONNECTORS.map((connector: any) => (
                          <button
                            key={connector.connectorName}
                            onClick={() => handlePickConnector(connector)}
                          >
                            <img
                              src={connector.connectorLogo?.mediaItemUrl}
                              alt={connector.connectorName}
                              className="connector-logo"
                            />
                            {connector.connectorName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {connectors.length === 0 ? (
                <div className="selectFirstConnector">
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

                  {connectors.map((connector, index) => (
                    <ConnectorCard
                      key={connector.id}
                      connector={connector}
                      connectorCost={connectorCosts[index]}
                      onRemove={removeConnector}
                      onUpdate={updateConnector}
                    />
                  ))}

                </div>

              )}


              {/* <div className="compareSolution">

                <div>
                  <Label htmlFor="comparison-toggle" className="text-base font-medium cursor-pointer">
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
                />

              </div> */}


              {/* {showComparison && (

                <ComparisonChart
                  timeBasedPrice={totalCost}
                  rowBasedPrice={rowBasedPrice}
                  numberOfRows={connectors.reduce(
                    (sum, c) => sum + c.numberOfRows,
                    0
                  )}
                />

              )} */}

            </div>

          </div>


          <div className="rightSide">

            <PricingSummary
              connectorCosts={connectorCosts}
              totalCost={totalCost}
              competitorTotal={competitorTotal}
              savings={totalSavings}
            />
            <div className='priceSummaryBtns'>
            {/* <button
              type="button"
              className="btn-open-receipt btn colorful-btn"
              onClick={() => setShowReceipt(true)}
            >
              <span />
              Show Email Receipt
            </button> */}

            
            <a
              href=""
              className="btn alt-blue-btn"
              target=""
            >Book A Call
            </a>
            <a
              href="#"
              className="btn colorful-btn"
              target=""
              onClick={() => setShowReceipt(true)}
            >
              <span />
              Show Email Receipt
            </a>
            </div>
            <ReceiptModal
              open={showReceipt}
              onClose={() => setShowReceipt(false)}
              connectors={connectors}
              connectorCosts={connectorCosts}
              totalCost={totalCost}
              competitorTotal={competitorTotal}
              savings={totalSavings}
            />

          </div>

        </div>

      </div>

    </div>
  )
}
import * as React from 'react'

import { Button } from './ui/button'
import { Card } from './ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Slider } from './ui/slider'
import { X } from 'lucide-react'

export interface Connector {
  id: string
  name: string
  frequency: '15min' | 'hourly' | 'daily'
  numberOfRows: number
}

interface ConnectorCardProps {
  connector: Connector
  onRemove: (id: string) => void
  onUpdate: (id: string, updates: Partial<Connector>) => void
}

const CONNECTORS = [
  'Salesforce',
  'HubSpot',
  'Postgres',
  'MySQL',
  'MongoDB',
  'Snowflake',
  'BigQuery',
  'Redshift',
  'DynamoDB',
  'Oracle',
  'SAP',
  'NetSuite',
  'Zendesk',
  'Jira',
]

export default function ConnectorCard({
  connector,
  onRemove,
  onUpdate,
}: ConnectorCardProps) {
  const rowsOptions = [
    { value: 0, label: '1K', rows: 1000 },
    { value: 20, label: '10K', rows: 10000 },
    { value: 40, label: '100K', rows: 100000 },
    { value: 60, label: '1M', rows: 1000000 },
    { value: 80, label: '5M', rows: 5000000 },
    { value: 100, label: '10M', rows: 10000000 },
  ]

  const getRowsFromSlider = (value: number): number => {
    if (value === 0) return 1000
    if (value === 20) return 10000
    if (value === 40) return 100000
    if (value === 60) return 1000000
    if (value === 80) return 5000000
    if (value === 100) return 10000000

    for (let i = 0; i < rowsOptions.length - 1; i++) {
      if (value >= rowsOptions[i].value && value < rowsOptions[i + 1].value) {
        const t =
          (value - rowsOptions[i].value) /
          (rowsOptions[i + 1].value - rowsOptions[i].value)
        const logMin = Math.log10(rowsOptions[i].rows)
        const logMax = Math.log10(rowsOptions[i + 1].rows)
        return Math.round(Math.pow(10, logMin + t * (logMax - logMin)))
      }
    }
    return 10000000
  }

  const getSliderFromRows = (rows: number): number => {
    if (rows <= 1000) return 0
    if (rows >= 10000000) return 100

    const logRows = Math.log10(rows)

    for (let i = 0; i < rowsOptions.length - 1; i++) {
      const logMin = Math.log10(rowsOptions[i].rows)
      const logMax = Math.log10(rowsOptions[i + 1].rows)

      if (logRows >= logMin && logRows <= logMax) {
        const t = (logRows - logMin) / (logMax - logMin)
        return (
          rowsOptions[i].value +
          t * (rowsOptions[i + 1].value - rowsOptions[i].value)
        )
      }
    }
    return 60
  }

  const handleSliderChange = (value: number[]) => {
    const newRows = getRowsFromSlider(value[0])
    onUpdate(connector.id, { numberOfRows: newRows })
  }

  const calculateMinutesPerSync = (rows: number): number => {
    return Math.max(1, Math.round(rows / 10000))
  }

  const minutesPerSync = calculateMinutesPerSync(connector.numberOfRows)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
 
  const [isOpen, setIsOpen] = React.useState(false)

React.useEffect(() => {
  setIsOpen(true)
}, [])

  return (
    <Card className="p-4">
      <div className="connectorBox">
        {mounted && (
          <div className="connectorBoxInner">
            <Select
             open={isOpen}
            onOpenChange={setIsOpen}


              value={connector.name}
              onValueChange={value => onUpdate(connector.id, { name: value })}
            >
              <SelectTrigger
                data-testid={`select-connector-${connector.id}`}
                className="w-full"
              >
                <SelectValue placeholder="Select connector" />
              </SelectTrigger>
              <SelectContent>
                {CONNECTORS.map(name => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="timeTabs">
              <Button
                variant={
                  connector.frequency === '15min' ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => onUpdate(connector.id, { frequency: '15min' })}
                data-testid={`button-frequency-15min-${connector.id}`}
                className="flex-1"
              >
                Every 15min
              </Button>
              <Button
                variant={
                  connector.frequency === 'hourly' ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => onUpdate(connector.id, { frequency: 'hourly' })}
                data-testid={`button-frequency-hourly-${connector.id}`}
                className="flex-1"
              >
                Hourly
              </Button>
              <Button
                variant={
                  connector.frequency === 'daily' ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => onUpdate(connector.id, { frequency: 'daily' })}
                data-testid={`button-frequency-daily-${connector.id}`}
                className="flex-1"
              >
                Daily
              </Button>
            </div>

            <div className="space-y-3 priceRangeBox">
              <div className="priceRangeBoxTop">
                <span className="text-sm font-medium">
                  {connector.numberOfRows.toLocaleString()} active rows/month
                </span>
                <span className="text-xs text-muted-foreground">
                  Est. {minutesPerSync} min/sync
                </span>
              </div>

              <Slider
                value={[getSliderFromRows(connector.numberOfRows)]}
                onValueChange={handleSliderChange}
                max={100}
                step={1}
                data-testid={`slider-rows-${connector.id}`}
              />
              <div className="flex justify-between text-xs text-muted-foreground font-medium tabular-nums">
                <span>1K</span>
                <span>10K</span>
                <span>100K</span>
                <span>1M</span>
                <span>5M</span>
                <span>10M</span>
              </div>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(connector.id)}
          data-testid={`button-remove-${connector.id}`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

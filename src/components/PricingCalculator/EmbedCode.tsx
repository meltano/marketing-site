import * as React from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { ChevronDown, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function EmbedCode() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [origin, setOrigin] = useState('')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  const embedCode = `<iframe src="${origin}" width="100%" height="800" frameborder="0"></iframe>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="p-6">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-0 h-auto hover-elevate"
            data-testid="button-toggle-embed"
          >
            <div className="text-left">
              <h3 className="text-lg font-semibold">Embed on Your Website</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Copy and paste this code into your landing page
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4">
          <div className="space-y-4">
            <div className="relative">
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm font-mono">
                <code>{embedCode}</code>
              </pre>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={handleCopy}
                data-testid="button-copy-embed"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This calculator is fully responsive and will adapt to your
              website's design
            </p>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

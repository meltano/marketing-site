import React, { useEffect } from 'react'

interface ReceiptModalProps {
  open: boolean
  onClose: () => void
  connectors: any[]
  connectorCosts: any[]
  totalCost: number
  competitorTotal?: number
  savings?: number
}

import EmailReceipt from './EmailReceipt'

export default function ReceiptModal({
  open,
  onClose,
  connectors,
  connectorCosts,
  totalCost,
  competitorTotal,
  savings,
}: ReceiptModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div className="receipt-backdrop glow-bg" onClick={onClose} />
      <div className="receipt-modal" role="dialog" aria-modal="true">
        <button className="receipt-close-btn" onClick={onClose} aria-label="Close receipt">
          ×
        </button>
        <EmailReceipt
          connectors={connectors}
          connectorCosts={connectorCosts}
          totalCost={totalCost}
          competitorTotal={competitorTotal}
          savings={savings}
        />
      </div>
    </>
  )
}
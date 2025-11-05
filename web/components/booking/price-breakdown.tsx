"use client"

import { Card } from "@/web/components/ui/card"
import { Info } from "lucide-react"

interface PriceBreakdownProps {
  baseFare: number
  distance: number
  distanceRate?: number
  loadingFee?: number
  tax?: number
  promoDiscount?: number
}

export function PriceBreakdown({
  baseFare,
  distance,
  distanceRate = 15,
  loadingFee = 100,
  tax = 0,
  promoDiscount = 0,
}: PriceBreakdownProps) {
  const distanceCost = distance * distanceRate
  const subtotal = baseFare + distanceCost + loadingFee
  const taxAmount = subtotal * (tax / 100)
  const total = subtotal + taxAmount - promoDiscount

  return (
    <Card className="bg-card border border-border p-4 md:p-6 space-y-4">
      <h3 className="font-semibold text-foreground">Price Breakdown</h3>

      <div className="space-y-2 border-b border-border pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Base Fare</span>
          <span className="font-medium text-foreground">₹{baseFare}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {distance} km @ ₹{distanceRate}/km
          </span>
          <span className="font-medium text-foreground">₹{distanceCost}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Loading & Unloading</span>
          <span className="font-medium text-foreground">₹{loadingFee}</span>
        </div>
      </div>

      {promoDiscount > 0 && (
        <div className="flex justify-between text-sm bg-green-50 dark:bg-green-950/20 p-2 rounded">
          <span className="text-green-700 dark:text-green-400">Promo Discount</span>
          <span className="font-medium text-green-700 dark:text-green-400">-₹{promoDiscount}</span>
        </div>
      )}

      {tax > 0 && (
        <div className="flex justify-between text-sm border-b border-border pb-4">
          <span className="text-muted-foreground">GST ({tax}%)</span>
          <span className="font-medium text-foreground">₹{taxAmount.toFixed(0)}</span>
        </div>
      )}

      <div className="flex justify-between pt-2">
        <span className="font-semibold text-foreground">Total</span>
        <span className="text-2xl font-bold text-accent">₹{total.toFixed(0)}</span>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-3 flex gap-2">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Price may vary based on traffic and demand. Final price confirmed after driver acceptance.
        </p>
      </div>
    </Card>
  )
}

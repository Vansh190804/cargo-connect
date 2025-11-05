"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Wallet, Banknote, Check } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "wallet" | "cod"
  label: string
  icon: React.ReactNode
  description?: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    type: "card",
    label: "Credit/Debit Card",
    icon: <CreditCard className="w-5 h-5" />,
    description: "Visa, Mastercard, RuPay",
  },
  {
    id: "wallet",
    type: "wallet",
    label: "Wallet",
    icon: <Wallet className="w-5 h-5" />,
    description: "Available balance: ₹2,500",
  },
  {
    id: "cod",
    type: "cod",
    label: "Cash on Delivery",
    icon: <Banknote className="w-5 h-5" />,
    description: "Pay driver after delivery",
  },
]

interface PaymentMethodSelectorProps {
  onSelect?: (methodId: string) => void
  defaultSelected?: string
}

export function PaymentMethodSelector({ onSelect, defaultSelected = "card" }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState(defaultSelected)

  const handleSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    onSelect?.(methodId)
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground">Payment Method</h3>
      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleSelect(method.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedMethod === method.id
                ? "border-accent bg-accent/10"
                : "border-border bg-card hover:border-accent/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${selectedMethod === method.id ? "text-accent" : "text-muted-foreground"}`}>
                  {method.icon}
                </div>
                <div>
                  <div className="font-medium text-foreground">{method.label}</div>
                  <div className="text-xs text-muted-foreground">{method.description}</div>
                </div>
              </div>
              {selectedMethod === method.id && <Check className="w-5 h-5 text-accent flex-shrink-0" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

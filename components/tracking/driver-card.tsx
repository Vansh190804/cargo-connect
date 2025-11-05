"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Star, Badge } from "lucide-react"

interface DriverCardProps {
  name: string
  rating: number
  reviews: number
  vehicleNumber: string
  image?: string
  phone?: string
  onCall?: () => void
  onChat?: () => void
}

export function DriverCard({ name, rating, reviews, vehicleNumber, image, phone, onCall, onChat }: DriverCardProps) {
  return (
    <Card className="bg-card border border-border p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            {image || "👤"}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">Vehicle: {vehicleNumber}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-foreground">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviews} trips)</span>
            </div>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">On the way</Badge>
      </div>

      <div className="flex gap-2">
        <Button onClick={onCall} size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
          <Phone className="w-4 h-4" />
          Call
        </Button>
        <Button onClick={onChat} size="sm" className="flex-1 bg-accent hover:bg-accent/90 text-primary gap-2">
          <MessageCircle className="w-4 h-4" />
          Chat
        </Button>
      </div>
    </Card>
  )
}

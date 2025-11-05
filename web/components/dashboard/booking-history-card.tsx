"use client"

import { Card } from "@/web/components/ui/card"
import { Badge } from "@/web/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"

interface BookingHistoryCardProps {
  id: string
  from: string
  to: string
  date: string
  amount: number
  status: "completed" | "cancelled" | "pending"
  rating?: number
}

const statusConfig = {
  completed: { bg: "bg-green-100 dark:bg-green-950", text: "text-green-800 dark:text-green-400" },
  cancelled: { bg: "bg-red-100 dark:bg-red-950", text: "text-red-800 dark:text-red-400" },
  pending: { bg: "bg-yellow-100 dark:bg-yellow-950", text: "text-yellow-800 dark:text-yellow-400" },
}

export function BookingHistoryCard({ id, from, to, date, amount, status, rating }: BookingHistoryCardProps) {
  return (
    <Link href={`/booking/${id}`}>
      <Card className="bg-card border border-border hover:border-accent/50 transition-all cursor-pointer">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Booking {id}</h3>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
            <Badge className={`${statusConfig[status].bg} ${statusConfig[status].text}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-2 mb-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{from}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground ml-3 text-xs">
              <span className="text-accent">↓</span>
              <span>{to}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-lg font-bold text-accent">₹{amount}</span>
            {rating && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3"
                    {...(i < rating
                      ? { fill: "#fbbf24", stroke: "#f59e0b" }
                      : { fill: "none", stroke: "currentColor" })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

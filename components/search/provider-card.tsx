"use client"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Shield, Star, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ProviderCardProps {
  id: string
  name: string
  vehicleType: string
  price: number
  eta: string
  distance: string
  rating: number
  reviews: number
  badges: string[]
  image?: string
}

export function ProviderCard({
  id,
  name,
  vehicleType,
  price,
  eta,
  distance,
  rating,
  reviews,
  badges,
  image,
}: ProviderCardProps) {
  return (
    <Link href={`/booking/${id}`}>
      <div className="bg-card border border-border rounded-xl hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex gap-4">
            {/* Provider Logo */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center">
              <span className="text-3xl">{image ? image : "🚗"}</span>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-foreground truncate">{name}</h3>
                  <p className="text-sm text-muted-foreground">{vehicleType}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl md:text-3xl font-bold text-accent">₹{price}</div>
                  <p className="text-xs text-muted-foreground">estimate</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mb-3">
                {badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge === "verified" && <Shield className="w-3 h-3 mr-1" />}
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{eta}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-muted-foreground">({reviews})</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <button className="text-sm font-semibold text-accent hover:underline">View Details</button>
                <ChevronRight className="w-4 h-4 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

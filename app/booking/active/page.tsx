"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DriverCard } from "@/components/tracking/driver-card"
import { TripTimeline } from "@/components/tracking/trip-timeline"
import { MapPin, Share2, Download, X, ChevronUp, Home, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ActiveBookingPage() {
  const [expandedSheet, setExpandedSheet] = useState(false)
  const [eta, setEta] = useState("23 mins")
  const [status, setStatus] = useState("On the way")

  // Mock booking data
  const booking = {
    id: "BK-20250105-001",
    pickupLocation: "Downtown, City Center",
    dropLocation: "Airport Terminal 2",
    distance: "12 km",
    driver: {
      name: "Rajesh Kumar",
      rating: 4.8,
      reviews: 243,
      vehicleNumber: "KA-01-AB-1234",
      image: "👨‍💼",
    },
  }

  const timelineSteps = [
    {
      id: "pickup",
      label: "Pickup",
      status: "completed" as const,
      time: "2:05 PM",
    },
    {
      id: "in-transit",
      label: "In Transit",
      status: "active" as const,
      eta: eta,
    },
    {
      id: "delivery",
      label: "Delivery",
      status: "pending" as const,
      eta: "2:28 PM",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(`${Math.max(1, Number.parseInt(eta) - 1)} mins`)
    }, 60000)
    return () => clearInterval(interval)
  }, [eta])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Your Delivery</h1>
              <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
            </div>
            <Link href="/dashboard/bookings" className="text-accent hover:text-accent/80">
              <X className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Map Placeholder - Full Screen */}
      <div className="flex-1 relative bg-primary/5 border-b border-border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-6xl">🗺️</div>
            <p className="text-muted-foreground">Live Map View</p>
            <p className="text-xs text-muted-foreground">showing real-time truck location</p>
          </div>
        </div>

        {/* Floating ETA Chip */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-semibold text-sm">{eta}</span>
          </div>
          <button className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1 gap-2" onClick={() => alert("Shared with contacts")}>
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            SOS
          </Button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border rounded-t-2xl transition-all duration-300 ${
          expandedSheet ? "h-3/4" : "h-auto"
        } max-h-3/4 shadow-2xl`}
      >
        {/* Drag Handle */}
        <div
          onClick={() => setExpandedSheet(!expandedSheet)}
          className="h-6 flex items-center justify-center cursor-pointer group"
        >
          <div className="w-10 h-1 bg-border rounded-full group-hover:bg-accent transition-colors" />
        </div>

        <div
          className={`px-4 sm:px-6 pb-6 overflow-y-auto ${expandedSheet ? "max-h-[calc(100%-32px)] overflow-y-auto" : ""}`}
        >
          {/* Driver Card */}
          <DriverCard
            name={booking.driver.name}
            rating={booking.driver.rating}
            reviews={booking.driver.reviews}
            vehicleNumber={booking.driver.vehicleNumber}
            image={booking.driver.image}
            onCall={() => alert("Calling " + booking.driver.name)}
            onChat={() => alert("Opening chat")}
          />

          {/* Trip Details */}
          <div className="mt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase text-muted-foreground font-semibold">Pickup</p>
                  <p className="font-medium text-foreground">{booking.pickupLocation}</p>
                </div>
              </div>

              <div className="h-8 w-px bg-border ml-2" />

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase text-muted-foreground font-semibold">Delivery</p>
                  <p className="font-medium text-foreground">{booking.dropLocation}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance Remaining</span>
                <span className="font-semibold text-foreground">{booking.distance}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {expandedSheet && (
            <div className="mt-6">
              <TripTimeline steps={timelineSteps} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 space-y-2 pb-4">
            <Button
              variant="outline"
              className="w-full gap-2 bg-transparent"
              onClick={() => alert("Invoice downloaded")}
            >
              <Download className="w-4 h-4" />
              Download Invoice
            </Button>
            <Button variant="outline" className="w-full text-destructive hover:text-destructive bg-transparent">
              Cancel Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { PriceBreakdown } from "@/components/booking/price-breakdown"
import { PaymentMethodSelector } from "@/components/booking/payment-method-selector"
import { MapPin, Calendar, Package, Star, Shield, Loader2, ArrowLeft, CheckCircle2, Truck } from "lucide-react"
import Link from "next/link"

export default function BookingPage({ params }: { params: { id: string } }) {
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Mock provider data
  const provider = {
    id: params.id,
    name: "FastMove Logistics",
    rating: 4.8,
    reviews: 243,
    vehicleType: "Truck",
    registrationNumber: "KA-01-AB-1234",
    image: "🚚",
  }

  // Mock booking details
  const booking = {
    from: "Downtown, City Center",
    to: "Airport Terminal 2",
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    items: "Electronics & Furniture",
    distance: 12,
  }

  const handleApplyPromo = () => {
    if (promoCode === "SAVE500") {
      setAppliedPromo(true)
    }
  }

  const handleBooking = async () => {
    if (!agreedToTerms) return

    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.href = "/booking/active"
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced header with better styling and visual hierarchy */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="p-2 hover:bg-card rounded-lg transition-colors text-accent hover:text-accent/80"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Confirm Booking</h1>
              <p className="text-sm text-muted-foreground">Review details and complete payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Modern provider card with gradient background and hover animations */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Your Provider
                </h2>
                <span className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">Verified</span>
                </span>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
                  {provider.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 text-lg">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {provider.vehicleType} • Registration: {provider.registrationNumber}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">{provider.rating}</span>
                      <span className="text-muted-foreground text-sm">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Enhanced booking summary with better visual organization */}
            <Card className="bg-card border border-border p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="font-semibold text-foreground mb-6 text-lg">Booking Details</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-1">
                      Pickup Location
                    </p>
                    <p className="font-medium text-foreground text-base">{booking.from}</p>
                  </div>
                </div>

                <div className="h-8 flex items-center justify-center">
                  <div className="h-6 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-1">
                      Drop Location
                    </p>
                    <p className="font-medium text-foreground text-base">{booking.to}</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3 border-t border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2 font-medium">
                      <Calendar className="w-4 h-4 text-primary" />
                      Date & Time
                    </span>
                    <span className="font-semibold text-foreground">
                      {booking.date}, {booking.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2 font-medium">
                      <Package className="w-4 h-4 text-primary" />
                      Item Type
                    </span>
                    <span className="font-semibold text-foreground">{booking.items}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">Distance</span>
                    <span className="font-semibold text-foreground">{booking.distance} km</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Modern promo code input with smooth interactions */}
            <Card className="bg-card border border-border p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="font-semibold text-foreground mb-4 text-lg">Promo Code</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={appliedPromo}
                  className="bg-input border-border h-11 rounded-lg hover:border-accent/50 transition-colors"
                />
                <Button
                  onClick={handleApplyPromo}
                  disabled={appliedPromo || !promoCode}
                  variant="outline"
                  className="px-6 bg-transparent border-accent/30 hover:border-accent/60 hover:bg-accent/5 transition-all"
                >
                  {appliedPromo ? "✓ Applied" : "Apply"}
                </Button>
              </div>
              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    ₹500 discount applied! Try code: SAVE500
                  </p>
                </div>
              )}
            </Card>

            {/* Enhanced terms with better styling */}
            <Card className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 p-5 hover:shadow-lg transition-all duration-300">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 mt-1 accent-accent rounded border-yellow-300 cursor-pointer"
                />
                <span className="text-sm text-yellow-900 dark:text-yellow-200 leading-relaxed">
                  I agree to the booking terms and cancellation policy. I understand that cancellations within 5 minutes
                  of booking will incur a ₹50 fee.
                </span>
              </label>
            </Card>
          </div>

          {/* Right Column - Summary & CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              {/* Price Breakdown */}
              <PriceBreakdown
                baseFare={200}
                distance={booking.distance}
                distanceRate={15}
                loadingFee={100}
                tax={5}
                promoDiscount={appliedPromo ? 500 : 0}
              />

              {/* Payment Method */}
              <Card className="bg-card border border-border p-6 hover:shadow-lg transition-all duration-300">
                <PaymentMethodSelector defaultSelected="card" onSelect={(method) => setPaymentMethod(method)} />
              </Card>

              {/* Enhanced CTA button with gradient and smooth interactions */}
              <Button
                onClick={handleBooking}
                disabled={!agreedToTerms || isProcessing}
                className="w-full h-12 bg-gradient-to-r from-accent to-accent/90 hover:shadow-lg hover:scale-105 text-accent-foreground font-bold rounded-lg transition-all duration-200"
              >
                {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isProcessing ? "Processing..." : `Pay ₹${(appliedPromo ? 545 : 1045).toFixed(0)} & Book`}
              </Button>

              {/* Security Info */}
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 flex gap-3 border border-blue-200 dark:border-blue-900">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                  Secure payment. Your data is protected with SSL encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

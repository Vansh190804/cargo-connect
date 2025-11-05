"use client"

import { useState } from "react"
import { Button } from "@/web/components/ui/button"
import { SearchFilters } from "@/web/components/search/search-filters"
import { ProviderCard } from "@/web/components/search/provider-card"
import { MapPin, Calendar, Map, List, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data for providers
const mockProviders = [
  {
    id: "1",
    name: "FastMove Logistics",
    vehicleType: "Truck",
    price: 1200,
    eta: "45 mins",
    distance: "12 km",
    rating: 4.8,
    reviews: 243,
    badges: ["verified", "insured"],
    image: "🚚",
  },
  {
    id: "2",
    name: "QuickShift Transport",
    vehicleType: "Auto",
    price: 450,
    eta: "20 mins",
    distance: "5 km",
    rating: 4.6,
    reviews: 156,
    badges: ["verified"],
    image: "🛺",
  },
  {
    id: "3",
    name: "SafeHaul Services",
    vehicleType: "Truck",
    price: 1500,
    eta: "50 mins",
    distance: "15 km",
    rating: 4.9,
    reviews: 421,
    badges: ["verified", "insured", "eco-friendly"],
    image: "🚗",
  },
  {
    id: "4",
    name: "SpeedBike Courier",
    vehicleType: "Bike",
    price: 250,
    eta: "15 mins",
    distance: "3 km",
    rating: 4.5,
    reviews: 89,
    badges: ["verified"],
    image: "🏍️",
  },
  {
    id: "5",
    name: "ProMove Express",
    vehicleType: "Truck",
    price: 1350,
    eta: "48 mins",
    distance: "14 km",
    rating: 4.7,
    reviews: 198,
    badges: ["verified", "insured"],
    image: "🚙",
  },
]

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])

  // Mock search params
  const from = "Downtown"
  const to = "Airport"
  const date = "Today, 2:00 PM"

  const toggleProvider = (id: string) => {
    setSelectedProviders((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="font-bold text-lg text-accent">
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-foreground">Search Results</h1>
            <div className="w-12" />
          </div>

          {/* Search Info */}
          <div className="bg-primary/10 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{from}</span>
                <span className="text-muted-foreground">→</span>
                <span>{to}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
            </div>
          </div>

          {/* View Mode Toggles */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                viewMode === "list"
                  ? "bg-accent text-primary"
                  : "bg-card border border-border text-foreground hover:border-accent"
              }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                viewMode === "map"
                  ? "bg-accent text-primary"
                  : "bg-card border border-border text-foreground hover:border-accent"
              }`}
            >
              <Map className="w-4 h-4" />
              Map
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-1`}>
            <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
              <SearchFilters onClose={() => setShowFilters(false)} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{mockProviders.length} Options Available</h2>
                <p className="text-sm text-muted-foreground">Sorted by recommendation</p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 bg-card border border-border rounded-lg hover:border-accent transition-colors"
              >
                Filters
              </button>
            </div>

            {/* Results List */}
            {viewMode === "list" ? (
              <div className="space-y-4">
                {mockProviders.map((provider) => (
                  <div key={provider.id} className="relative">
                    <ProviderCard {...provider} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl overflow-hidden h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">Map view coming soon</p>
                  <p className="text-sm text-muted-foreground">Providers will be displayed on interactive map</p>
                </div>
              </div>
            )}

            {/* No Results */}
            {mockProviders.length === 0 && (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold text-foreground mb-2">No providers found</h3>
                <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters or search parameters</p>
                <Button variant="outline">Modify Search</Button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Compare CTA */}
        {selectedProviders.length > 0 && (
          <div className="fixed bottom-6 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:max-w-sm">
            <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold h-12 rounded-lg shadow-lg">
              Compare {selectedProviders.length} Provider{selectedProviders.length !== 1 ? "s" : ""}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

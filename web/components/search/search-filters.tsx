"use client"

import { Slider } from "@/web/components/ui/slider"
import { Button } from "@/web/components/ui/button"
import { Filter, X } from "lucide-react"
import { useState } from "react"

interface SearchFiltersProps {
  onFilterChange?: (filters: any) => void
  onClose?: () => void
}

export function SearchFilters({ onFilterChange, onClose }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState([500, 5000])
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState("all")

  const vehicleTypes = [
    { id: "bike", label: "Bike", icon: "🏍️" },
    { id: "auto", label: "Auto", icon: "🛺" },
    { id: "truck", label: "Truck", icon: "🚗" },
    { id: "tempu", label: "Tempu", icon: "📦" },
  ]

  const handleVehicleToggle = (id: string) => {
    const updated = selectedVehicles.includes(id) ? selectedVehicles.filter((v) => v !== id) : [...selectedVehicles, id]
    setSelectedVehicles(updated)
    onFilterChange?.({ vehicles: updated, priceRange, rating: selectedRating })
  }

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </h3>
        {onClose && (
          <button onClick={onClose} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Vehicle Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Vehicle Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {vehicleTypes.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => handleVehicleToggle(vehicle.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedVehicles.includes(vehicle.id)
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card hover:border-border/80"
              }`}
            >
              <div className="text-lg mb-1">{vehicle.icon}</div>
              <div className="text-xs font-medium">{vehicle.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <h4 className="text-sm font-semibold text-foreground">Price Range</h4>
          <span className="text-sm text-accent font-semibold">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </span>
        </div>
        <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={10000} step={100} className="w-full" />
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Driver Rating</h4>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Ratings" },
            { value: "4.5+", label: "⭐ 4.5+ Stars" },
            { value: "4+", label: "⭐ 4+ Stars" },
            { value: "3.5+", label: "⭐ 3.5+ Stars" },
          ].map((rating) => (
            <label key={rating.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating.value}
                checked={selectedRating === rating.value}
                onChange={(e) => {
                  setSelectedRating(e.target.value)
                  onFilterChange?.({ vehicles: selectedVehicles, priceRange, rating: e.target.value })
                }}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-foreground">{rating.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() => {
          setSelectedVehicles([])
          setPriceRange([500, 5000])
          setSelectedRating("all")
        }}
      >
        Clear All Filters
      </Button>
    </div>
  )
}

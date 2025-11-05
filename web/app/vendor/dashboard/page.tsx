"use client"

import { useState } from "react"
import { Button } from "@/web/components/ui/button"
import { Card } from "@/web/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  LogOut,
  Settings,
  Bell,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Navigation,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Clock3,
  MailCheck as MapPinCheck,
} from "lucide-react"
import Link from "next/link"

const earningsData = [
  { day: "Mon", earnings: 2400 },
  { day: "Tue", earnings: 1398 },
  { day: "Wed", earnings: 3200 },
  { day: "Thu", earnings: 2780 },
  { day: "Fri", earnings: 3890 },
  { day: "Sat", earnings: 4490 },
  { day: "Sun", earnings: 2100 },
]

const rideStatusData = [
  { name: "Completed", value: 85, color: "var(--color-green-500)" },
  { name: "Pending", value: 10, color: "var(--color-accent)" },
  { name: "Cancelled", value: 5, color: "var(--color-destructive)" },
]

export default function VendorDashboardPage() {
  const [hasActiveRide, setHasActiveRide] = useState(false)
  const [expandedSheet, setExpandedSheet] = useState(false)

  // Mock active ride data
  const activeRide = hasActiveRide
    ? {
        id: "RD-20250105-042",
        pickupLocation: "Tech Park, Sector 5",
        dropLocation: "Airport Terminal 2",
        distance: "15 km",
        eta: "28 mins",
        status: "On the way",
        customer: {
          name: "Rajesh Kumar",
          rating: 4.9,
          reviews: 156,
          phone: "+91 9876543210",
          image: "👨‍💼",
        },
        earnings: "₹450",
      }
    : null

  const upcomingRides = [
    {
      id: "RD-001",
      customer: "Priya Sharma",
      from: "Downtown",
      to: "Airport",
      time: "2:30 PM",
      distance: "12 km",
      earning: "₹380",
    },
    {
      id: "RD-002",
      customer: "Amit Patel",
      from: "City Center",
      to: "Tech Park",
      time: "3:00 PM",
      distance: "8 km",
      earning: "₹290",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Vendor Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Rajesh!</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-card rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-card rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-foreground" />
              </button>
              <Link href="/" className="p-2 hover:bg-card rounded-lg transition-colors">
                <LogOut className="w-5 h-5 text-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Go Online / Offline Section */}
        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Earn?</h2>
              <p className="text-muted-foreground">Go online to accept ride requests and start earning</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold gap-2">
                <Navigation className="w-4 h-4" />
                Go Online
              </Button>
              <Button variant="outline" className="bg-transparent gap-2">
                View Settings
              </Button>
            </div>
          </div>
        </Card>

        {activeRide && (
          <div className="mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Map Section */}
                <div className="lg:col-span-2 relative bg-primary/5 border border-primary/10 rounded-lg overflow-hidden min-h-80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-5xl">🗺️</div>
                      <p className="text-muted-foreground">Live Route Map</p>
                      <p className="text-xs text-muted-foreground">showing active ride location</p>
                    </div>
                  </div>

                  {/* Floating ETA Chip */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold text-sm">{activeRide.eta}</span>
                    </div>
                    <span className="bg-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold">Active</span>
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1 gap-2">
                      <Navigation className="w-4 h-4" />
                      Navigate
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Help
                    </Button>
                  </div>
                </div>

                {/* Ride Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Customer Details</h3>
                    <div className="bg-background border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-2xl">
                          {activeRide.customer.image}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">{activeRide.customer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ⭐ {activeRide.customer.rating} ({activeRide.customer.reviews})
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                          <Phone className="w-4 h-4" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                          <MessageSquare className="w-4 h-4" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Ride Location Details */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Trip Details</h3>
                    <div className="bg-background border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPinCheck className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-xs uppercase text-muted-foreground font-semibold">Pickup</p>
                          <p className="text-sm font-medium text-foreground">{activeRide.pickupLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-xs uppercase text-muted-foreground font-semibold">Delivery</p>
                          <p className="text-sm font-medium text-foreground">{activeRide.dropLocation}</p>
                        </div>
                      </div>
                      <div className="border-t border-border pt-3">
                        <p className="text-xs text-muted-foreground">Earnings for this trip</p>
                        <p className="text-2xl font-bold text-accent">{activeRide.earnings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-1">Today's Earnings</p>
            <h3 className="text-3xl font-bold text-foreground mb-2">₹2,450</h3>
            <p className="text-xs text-green-600 dark:text-green-400">+12% from yesterday</p>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-1">Total Rides</p>
            <h3 className="text-3xl font-bold text-foreground mb-2">156</h3>
            <p className="text-xs text-muted-foreground">This month</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-1">Rating</p>
            <h3 className="text-3xl font-bold text-foreground mb-2">4.8★</h3>
            <p className="text-xs text-muted-foreground">Based on 156 trips</p>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Chart */}
            <Card className="bg-card border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Earnings</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="earnings" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Upcoming Rides */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock3 className="w-5 h-5" />
                  Upcoming Rides
                </h2>
              </div>
              <div className="grid gap-4">
                {upcomingRides.map((ride) => (
                  <Card
                    key={ride.id}
                    className="bg-card border border-border p-4 hover:border-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{ride.customer}</p>
                        <p className="text-xs text-muted-foreground">{ride.time}</p>
                      </div>
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                        {ride.earning}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinCheck className="w-4 h-4 text-accent" />
                      <span className="text-sm text-foreground">{ride.from}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-sm text-foreground">{ride.to}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{ride.distance}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-card border border-border p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/50 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                👨‍💼
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Rajesh Kumar</h3>
              <p className="text-sm text-muted-foreground mb-1">rajesh@example.com</p>
              <p className="text-xs text-muted-foreground mb-4">Member since Jan 2023</p>
              <Button variant="outline" className="w-full bg-transparent">
                Edit Profile
              </Button>
            </Card>

            {/* Ride Status Distribution */}
            <Card className="bg-card border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Ride Status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={rideStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {rideStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {rideStatusData.map((status) => (
                  <div key={status.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                      <span className="text-muted-foreground">{status.name}</span>
                    </div>
                    <span className="font-semibold text-foreground">{status.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="bg-card border border-border p-6">
              <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-border rounded-lg transition-colors text-sm font-medium text-foreground text-left">
                  View Support
                </button>
                <button className="w-full px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-border rounded-lg transition-colors text-sm font-medium text-foreground text-left">
                  Documents & Verification
                </button>
                <button className="w-full px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-border rounded-lg transition-colors text-sm font-medium text-foreground text-left">
                  Vehicle Details
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

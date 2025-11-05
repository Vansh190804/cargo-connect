"use client"

import { useState } from "react"
import { Button } from "@/web/components/ui/button"
import { Card } from "@/web/components/ui/card"
import { Input } from "@/web/components/ui/input"
import { BookingHistoryCard } from "@/web/components/dashboard/booking-history-card"
import { SavedAddressCard } from "@/web/components/dashboard/saved-address-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  LogOut,
  Settings,
  Bell,
  CreditCard,
  MapPin,
  History,
  TrendingUp,
  Star,
  Search,
  ArrowRight,
  Phone,
  MessageSquare,
  Clock,
  Home,
  AlertCircle,
  Share2,
  Zap,
  ChevronRight,
  Truck,
  Award,
  Wallet,
  Plus,
  Edit2,
} from "lucide-react"
import Link from "next/link"

const spendingData = [
  { month: "Jan", spending: 2400, trips: 8 },
  { month: "Feb", spending: 1398, trips: 6 },
  { month: "Mar", spending: 3200, trips: 12 },
  { month: "Apr", spending: 2780, trips: 10 },
  { month: "May", spending: 1890, trips: 7 },
  { month: "Jun", spending: 2390, trips: 9 },
]

const quickStats = [
  { label: "Total Bookings", value: "24", change: "+5 this month", icon: Truck, color: "from-blue-600 to-blue-400" },
  { label: "Total Spent", value: "₹12.4K", change: "This year", icon: Wallet, color: "from-orange-600 to-orange-400" },
  {
    label: "Average Rating",
    value: "4.8★",
    change: "Based on 24 trips",
    icon: Award,
    color: "from-green-600 to-green-400",
  },
]

export default function DashboardPage() {
  const [hasActiveBooking, setHasActiveBooking] = useState(false)
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")

  const [bookings] = useState([
    {
      id: "BK-001",
      from: "Downtown",
      to: "Airport",
      date: "Today, 2:30 PM",
      amount: 1045,
      status: "completed" as const,
      rating: 5,
    },
    {
      id: "BK-002",
      from: "City Center",
      to: "Tech Park",
      date: "Yesterday, 5:00 PM",
      amount: 850,
      status: "completed" as const,
      rating: 4,
    },
    {
      id: "BK-003",
      from: "Residential Area",
      to: "Market",
      date: "2 days ago, 10:00 AM",
      amount: 450,
      status: "completed" as const,
      rating: 5,
    },
  ])

  const [addresses] = useState([
    {
      id: "1",
      type: "home" as const,
      address: "Jubilee Hills, Hyderabad",
      details: "Main entrance",
    },
    {
      id: "2",
      type: "work" as const,
      address: "Tech Tower, HITEC City",
      details: "Building 5, Floor 3",
    },
  ])

  const activeBooking = hasActiveBooking
    ? {
        id: "BK-20250105-001",
        pickupLocation: "Downtown, City Center",
        dropLocation: "Airport Terminal 2",
        distance: "12 km",
        eta: "23 mins",
        status: "On the way",
        driver: {
          name: "Rajesh Kumar",
          rating: 4.8,
          reviews: 243,
          vehicleNumber: "KA-01-AB-1234",
          image: "👨‍💼",
        },
      }
    : null

  const handleSearchBooking = () => {
    if (pickupLocation && dropLocation) {
      console.log("Searching for trucks:", { pickupLocation, dropLocation })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-sm text-slate-400">Welcome back, Priya! Ready to move things?</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-slate-700/50 rounded-xl transition-all duration-200 hover:scale-110">
                <Bell className="w-5 h-5 text-slate-300" />
              </button>
              <button className="p-2.5 hover:bg-slate-700/50 rounded-xl transition-all duration-200 hover:scale-110">
                <Settings className="w-5 h-5 text-slate-300" />
              </button>
              <Link
                href="/"
                className="p-2.5 hover:bg-slate-700/50 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <LogOut className="w-5 h-5 text-slate-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Hero Search Card - Full Width */}
          <div className="lg:col-span-12">
            <Card className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-40 -mt-40"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full -ml-20 -mb-20"></div>

              <div className="relative z-10 p-8 md:p-10">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                      <Zap className="w-8 h-8" />
                      Book Your Truck
                    </h2>
                    <p className="text-white/90 text-lg">Fast, secure, and reliable transport in minutes</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-md">
                    <Truck className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Search inputs */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Pickup Location
                    </label>
                    <Input
                      placeholder="e.g., Downtown, City Center"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="bg-white/20 border-white/40 text-white placeholder:text-white/60 h-12 rounded-xl backdrop-blur-md hover:bg-white/30 transition-all focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Drop-off Location
                    </label>
                    <Input
                      placeholder="e.g., Airport Terminal 2"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      className="bg-white/20 border-white/40 text-white placeholder:text-white/60 h-12 rounded-xl backdrop-blur-md hover:bg-white/30 transition-all focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  <Button
                    onClick={handleSearchBooking}
                    className="bg-white hover:bg-white/90 text-orange-600 font-bold h-12 rounded-xl gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                </div>

                {/* Quick suggestions */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-white/80 mb-3 font-semibold">Quick Suggestions</p>
                  <div className="flex flex-wrap gap-3">
                    {addresses.map((addr) => (
                      <button
                        key={addr.id}
                        onClick={() => setPickupLocation(addr.address)}
                        className="px-4 py-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full text-sm font-medium text-white hover:bg-white/25 hover:border-white/50 transition-all duration-200 flex items-center gap-2 group"
                      >
                        <MapPin className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                        {addr.address}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Active Booking - Spans 12 cols if present, otherwise hidden */}
          {activeBooking && (
            <div className="lg:col-span-12">
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Map Section */}
                  <div className="lg:col-span-2 relative bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-600 rounded-2xl overflow-hidden min-h-96 shadow-inner">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="text-6xl">🗺️</div>
                        <p className="text-slate-200 font-semibold">Live Map View</p>
                        <p className="text-xs text-slate-400">Real-time truck location tracking</p>
                      </div>
                    </div>

                    {/* Floating ETA */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <div className="bg-white/95 text-slate-900 px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold">
                        <Clock className="w-5 h-5" />
                        <span>{activeBooking.eta}</span>
                      </div>
                    </div>

                    {/* Floating Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1 gap-2 bg-white/90 hover:bg-white">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                      <Button variant="secondary" size="sm" className="gap-2 bg-red-500/90 hover:bg-red-600 text-white">
                        <AlertCircle className="w-4 h-4" />
                        SOS
                      </Button>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                        <span className="text-lg">👤</span> Driver Details
                      </h3>
                      <div className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 space-y-3 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                            {activeBooking.driver.image}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white text-sm">{activeBooking.driver.name}</p>
                            <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {activeBooking.driver.rating} ({activeBooking.driver.reviews} reviews)
                            </p>
                            <p className="text-xs text-slate-400 mt-1 font-mono">
                              {activeBooking.driver.vehicleNumber}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-slate-600/50">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2 bg-transparent border-slate-500 text-white hover:bg-slate-600/50"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent border-slate-500 text-white hover:bg-slate-600/50"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Trip Details
                      </h3>
                      <div className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 space-y-3 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                          <Home className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-xs uppercase text-slate-400 font-bold tracking-wide">Pickup</p>
                            <p className="text-sm font-medium text-white">{activeBooking.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-xs uppercase text-slate-400 font-bold tracking-wide">Delivery</p>
                            <p className="text-sm font-medium text-white">{activeBooking.dropLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Quick Stats - 3 columns */}
          {quickStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="lg:col-span-4">
                <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-20 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-300`}
                  ></div>

                  <div className="relative z-10 space-y-3">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                      <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                      <p className="text-xs text-slate-400 mt-2">{stat.change}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Spending Chart - Large Card */}
          <div className="lg:col-span-8">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                    Spending Trend
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Your transport spending over time</p>
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "12px",
                        color: "#f1f5f9",
                      }}
                    />
                    <Bar dataKey="spending" fill="#fb923c" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Sidebar - Saved Addresses */}
          <div className="lg:col-span-4">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  Saved Addresses
                </h3>
                <button className="p-1.5 hover:bg-slate-700/70 rounded-lg transition-all text-orange-400 hover:scale-110">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr.id} className="group">
                    <SavedAddressCard {...addr} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Bookings - Full Width */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <History className="w-6 h-6 text-orange-400" />
                  Recent Bookings
                </h2>
                <Link
                  href="/booking/history"
                  className="text-orange-400 hover:text-orange-300 text-sm font-bold flex items-center gap-1 transition-colors group"
                >
                  View All
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid gap-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="hover:scale-102 transition-transform duration-300">
                    <BookingHistoryCard {...booking} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Profile Card - Right Sidebar */}
          <div className="lg:col-span-4">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl ring-4 ring-slate-700">
                  👩
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Priya Sharma</h3>
                  <p className="text-sm text-slate-400 mt-1">priya@example.com</p>
                  <p className="text-xs text-slate-500 mt-2">Member since Jan 2024</p>
                </div>
                <Link href="/profile" className="w-full mt-2">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all hover:shadow-lg hover:scale-105">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-4">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid gap-3">
                {[
                  { icon: CreditCard, label: "+ Add Payment Method", action: "payment" },
                  { icon: Wallet, label: "View Wallet", action: "wallet" },
                  { icon: AlertCircle, label: "Support & Help", action: "support" },
                ].map((action, i) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={i}
                      className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-600/70 border border-slate-600/30 hover:border-orange-400/50 rounded-xl transition-all duration-200 text-sm font-semibold text-white flex items-center gap-3 group"
                    >
                      <Icon className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                      {action.label}
                      <ChevronRight className="w-4 h-4 text-slate-500 ml-auto group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

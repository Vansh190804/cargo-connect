"use client"

import { MapPin, Calendar, Package, Search, CheckCircle2, Zap, Lock, Users, Truck } from "lucide-react"
import { Button } from "@/web/components/ui/button"
import { Input } from "@/web/components/ui/input"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Cargo Connect</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/signin" className="text-foreground hover:text-primary transition-colors font-medium">
                Sign In
              </Link>
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 font-semibold"
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold text-primary mb-4">
                Fast • Reliable • Transparent
              </span>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">Move Your Goods, Instantly.</h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Find, compare, and book reliable trucks for your transport needs. Real-time tracking, transparent
                pricing, and verified drivers.
              </p>
            </div>

            {/* Hero Search Box */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Pickup Location
                    </label>
                    <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-3 border border-border">
                      <MapPin className="w-4 h-4 text-primary" />
                      <Input placeholder="Enter pickup address" className="border-0 bg-transparent text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Drop Location
                    </label>
                    <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-3 border border-border">
                      <MapPin className="w-4 h-4 text-primary" />
                      <Input placeholder="Enter drop address" className="border-0 bg-transparent text-sm" />
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Date & Time
                    </label>
                    <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-3 border border-border">
                      <Calendar className="w-4 h-4 text-primary" />
                      <Input type="datetime-local" className="border-0 bg-transparent text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Item Type</label>
                    <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-3 border border-border">
                      <Package className="w-4 h-4 text-primary" />
                      <select className="border-0 bg-transparent text-sm w-full">
                        <option>Select item type</option>
                        <option>Documents</option>
                        <option>Furniture</option>
                        <option>Electronics</option>
                        <option>Fragile Items</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12 rounded-lg"
                >
                  <Link href="/search" className="flex items-center justify-center gap-2">
                    <Search className="w-4 h-4" />
                    Find Trucks & Compare
                  </Link>
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "50K+", label: "Active Drivers" },
                { number: "100K+", label: "Completed Trips" },
                { number: "4.8★", label: "Average Rating" },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{stat.number}</div>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block">
            <img
              src="/truck-delivery-logistics-illustration.jpg"
              alt="Truck delivery"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card border-y py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-center">How It Works</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Simple steps to book your perfect truck
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8" />,
                title: "Search",
                description: "Enter your pickup and drop locations, date, and item type to get instant quotes.",
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Compare",
                description:
                  "View multiple providers with transparent pricing, ratings, and vehicle details side-by-side.",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Book & Track",
                description: "Book your preferred option and track your delivery in real-time with driver updates.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-background rounded-2xl p-8 border border-border">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center text-accent mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">Why Choose Cargo Connect?</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Everything you need for seamless transport
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Lock className="w-6 h-6" />,
              title: "Secure Payments",
              description: "Multiple payment options with encrypted transactions and buyer protection.",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Instant Quotes",
              description: "Real-time pricing from multiple providers in seconds.",
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Verified Drivers",
              description: "All drivers are verified with background checks and customer ratings.",
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              title: "Live Tracking",
              description: "GPS-enabled tracking with real-time driver location and ETA updates.",
            },
          ].map((feature, i) => (
            <div key={i} className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card border-y py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-center">What Customers Say</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">Real stories from real users</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Small Business Owner",
                comment:
                  "Cargo Connect made moving my inventory so easy. The comparison feature saved me 40% on shipping costs!",
              },
              {
                name: "Priya Sharma",
                role: "E-commerce Manager",
                comment:
                  "Real-time tracking gives our customers peace of mind. Customer complaints about delivery dropped by 70%.",
              },
              {
                name: "Amit Patel",
                role: "Logistics Driver",
                comment:
                  "Great platform to find consistent bookings. The app is user-friendly and payments are always on time.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-background rounded-xl p-8 border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-accent text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground/90 mb-6 italic leading-relaxed">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary/10 border border-primary/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Move Your Goods?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and individuals using Cargo Connect for fast, reliable, and affordable
            transport.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12 rounded-full"
            >
              <Link href="/search">Book Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 font-semibold px-8 h-12 rounded-full bg-transparent"
            >
              <Link href="/auth/signup">Sign Up as Driver</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">Cargo Connect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart truck booking and moving platform for goods transport.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: ["Book a Truck", "For Drivers", "Pricing"],
              },
              {
                title: "Company",
                links: ["About Us", "Blog", "Contact"],
              },
              {
                title: "Legal",
                links: ["Terms", "Privacy", "Security"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">&copy; 2025 Cargo Connect. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                LinkedIn
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

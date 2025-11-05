"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Edit2, Save, X } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@example.com",
    phone: "+91 9876543210",
    dateOfBirth: "1995-06-15",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-accent hover:text-accent/80">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">My Profile</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Avatar */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/50 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">
            👩
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Form */}
        <Card className="bg-card border border-border p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">First Name</label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Name</label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date of Birth</label>
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              disabled={!isEditing}
              className="bg-input border-border"
            />
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button
                className="flex-1 bg-accent hover:bg-accent/90 text-primary gap-2"
                onClick={() => setIsEditing(false)}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          )}
        </Card>

        {/* Other Sections */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Card className="bg-card border border-border p-4">
            <h3 className="font-semibold text-foreground mb-2">Security</h3>
            <p className="text-sm text-muted-foreground mb-4">Change your password and security settings</p>
            <Button variant="outline" className="w-full bg-transparent">
              Change Password
            </Button>
          </Card>

          <Card className="bg-card border border-border p-4">
            <h3 className="font-semibold text-foreground mb-2">Preferences</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage notifications and app settings</p>
            <Button variant="outline" className="w-full bg-transparent">
              Settings
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Card } from "@/web/components/ui/card"
import { Edit2, Trash2, Star } from "lucide-react"

interface SavedAddressProps {
  id: string
  type: "home" | "work" | "other"
  address: string
  details: string
  onDelete?: () => void
}

const typeConfig = {
  home: { label: "Home", icon: "🏠", color: "bg-blue-100 dark:bg-blue-950" },
  work: { label: "Work", icon: "💼", color: "bg-purple-100 dark:bg-purple-950" },
  other: { label: "Other", icon: "📍", color: "bg-gray-100 dark:bg-gray-950" },
}

export function SavedAddressCard({ id, type, address, details, onDelete }: SavedAddressProps) {
  const config = typeConfig[type]

  return (
    <Card className="bg-card border border-border p-4">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${config.color}`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground text-sm">{config.label}</h3>
            {type === "home" && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
          </div>
          <p className="text-sm text-foreground truncate">{address}</p>
          <p className="text-xs text-muted-foreground">{details}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button className="p-1.5 hover:bg-card-foreground/10 rounded transition-colors">
            <Edit2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button onClick={onDelete} className="p-1.5 hover:bg-destructive/10 rounded transition-colors">
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>
    </Card>
  )
}

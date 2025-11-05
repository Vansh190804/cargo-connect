"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

interface TimelineStep {
  id: string
  label: string
  status: "completed" | "active" | "pending"
  time?: string
  eta?: string
}

interface TripTimelineProps {
  steps: TimelineStep[]
}

export function TripTimeline({ steps }: TripTimelineProps) {
  return (
    <Card className="bg-card border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Trip Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === "completed"
                    ? "bg-accent text-primary"
                    : step.status === "active"
                      ? "bg-accent/20 border-2 border-accent text-accent"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-3 h-3" />}
              </div>
              {index < steps.length - 1 && <div className="w-0.5 h-12 bg-border my-1" />}
            </div>

            {/* Content */}
            <div className="pb-4 flex-1 pt-1">
              <div className="flex items-start justify-between">
                <h4
                  className={`font-medium ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}
                >
                  {step.label}
                </h4>
                <div className="text-right">
                  {step.time && <div className="text-xs text-accent font-semibold">{step.time}</div>}
                  {step.eta && <div className="text-xs text-muted-foreground">ETA: {step.eta}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

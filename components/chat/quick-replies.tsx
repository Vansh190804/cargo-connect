"use client"

interface QuickRepliesProps {
  onSelect?: (reply: string) => void
}

const quickReplies = [
  "I'm at the pickup location",
  "I'm running late",
  "Please wait 5 minutes",
  "How long will you take?",
  "Thank you!",
  "All good",
]

export function QuickReplies({ onSelect }: QuickRepliesProps) {
  return (
    <div className="space-y-2 bg-card border border-border rounded-lg p-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase">Quick Replies</p>
      <div className="grid grid-cols-2 gap-2">
        {quickReplies.map((reply, i) => (
          <button
            key={i}
            onClick={() => onSelect?.(reply)}
            className="text-left px-3 py-2 bg-primary/5 border border-border rounded-lg hover:bg-primary/10 hover:border-accent transition-all text-xs font-medium text-foreground"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  )
}

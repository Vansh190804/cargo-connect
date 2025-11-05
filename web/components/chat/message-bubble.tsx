"use client"

import { cn } from "@/lib/utils"
import { Check, CheckCheck } from "lucide-react"

interface MessageBubbleProps {
  message: string
  timestamp: string
  sender: "user" | "driver"
  status?: "sending" | "sent" | "delivered"
  image?: string
}

export function MessageBubble({ message, timestamp, sender, status = "delivered", image }: MessageBubbleProps) {
  const isUser = sender === "user"

  return (
    <div className={cn("flex gap-3 mb-4", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm",
          isUser ? "bg-accent text-primary" : "bg-muted text-foreground",
        )}
      >
        {image || (isUser ? "👤" : "👨‍💼")}
      </div>

      {/* Message Content */}
      <div className={cn("flex flex-col gap-1 max-w-xs", isUser && "items-end")}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl break-words",
            isUser ? "bg-accent text-primary rounded-br-none" : "bg-muted text-foreground rounded-bl-none",
          )}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>

        {/* Status & Timestamp */}
        <div className={cn("flex items-center gap-1 text-xs text-muted-foreground", isUser && "flex-row-reverse")}>
          {isUser && (
            <>
              {status === "sending" && <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" />}
              {status === "sent" && <Check className="w-3 h-3" />}
              {status === "delivered" && <CheckCheck className="w-3 h-3" />}
            </>
          )}
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  )
}

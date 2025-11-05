"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/web/components/ui/input"
import { MessageBubble } from "@/web/components/chat/message-bubble"
import { QuickReplies } from "@/web/components/chat/quick-replies"
import { Send, Paperclip, Phone, X } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  text: string
  timestamp: string
  sender: "user" | "driver"
  status?: "sending" | "sent" | "delivered"
}

export default function ChatPage({ params }: { params: { bookingId: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I am 5 minutes away from your location",
      timestamp: "2:15 PM",
      sender: "driver",
      status: "delivered",
    },
    {
      id: "2",
      text: "Great! I'm ready",
      timestamp: "2:16 PM",
      sender: "user",
      status: "delivered",
    },
    {
      id: "3",
      text: "I'm outside your location now. Can you come down?",
      timestamp: "2:20 PM",
      sender: "driver",
      status: "delivered",
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      sender: "user",
      status: "sending",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setShowQuickReplies(false)

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))
    }, 500)

    // Simulate driver response
    setTimeout(() => {
      const driverResponses = [
        "Coming up now!",
        "On my way",
        "2 minutes",
        "Sure, no problem!",
        "Thank you for waiting!",
      ]
      const randomResponse = driverResponses[Math.floor(Math.random() * driverResponses.length)]
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          sender: "driver",
          status: "delivered",
        },
      ])
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">Rajesh Kumar</h1>
              <p className="text-xs text-green-600 dark:text-green-400">Online</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-card rounded-full transition-colors">
                <Phone className="w-5 h-5 text-foreground" />
              </button>
              <Link href="/booking/active" className="p-2 hover:bg-card rounded-full transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg.text}
              timestamp={msg.timestamp}
              sender={msg.sender}
              status={msg.status}
              image={msg.sender === "driver" ? "👨‍💼" : undefined}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full space-y-3">
          {showQuickReplies && <QuickReplies onSelect={(reply) => handleSendMessage(reply)} />}

          <div className="flex gap-2">
            <button className="p-2 hover:bg-card rounded-lg transition-colors flex-shrink-0">
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="flex-1 bg-input border-border"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="p-2 bg-accent hover:bg-accent/90 disabled:bg-muted text-primary rounded-lg transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setShowQuickReplies(!showQuickReplies)}
            className="w-full text-xs font-medium text-accent hover:text-accent/80 transition-colors"
          >
            {showQuickReplies ? "Hide Quick Replies" : "Show Quick Replies"}
          </button>
        </div>
      </div>
    </div>
  )
}

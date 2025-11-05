"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/web/components/ui/input"
import { ArrowLeft, Send, Paperclip, Smile, Phone, Video, MoreVertical } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  sender: "driver" | "customer"
  text: string
  timestamp: string
  status?: "sent" | "delivered" | "read"
}

export default function VendorChatPage({ params }: { params: { rideId: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "customer",
      text: "Hi, I'm running 5 minutes late. Can you wait?",
      timestamp: "2:15 PM",
      status: "read",
    },
    {
      id: "2",
      sender: "driver",
      text: "No problem! I'm here. Take your time.",
      timestamp: "2:16 PM",
      status: "read",
    },
    {
      id: "3",
      sender: "customer",
      text: "Thanks! I'll be there in 3 minutes.",
      timestamp: "2:17 PM",
      status: "read",
    },
    {
      id: "4",
      sender: "driver",
      text: "Perfect! I'll be waiting.",
      timestamp: "2:17 PM",
      status: "delivered",
    },
  ])

  const [messageText, setMessageText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim()) return

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: "driver",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    setMessages([...messages, newMessage])
    setMessageText("")
    setIsLoading(true)

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))
      setIsLoading(false)
    }, 500)
  }

  const quickReplies = ["On the way!", "5 mins away", "Arrived", "Please come out", "Traffic ahead", "Thank you!"]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/vendor/dashboard" className="text-accent hover:text-accent/80">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-foreground">Priya Sharma</h1>
                <p className="text-xs text-green-600 dark:text-green-400">Active - 2 mins away</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-card rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-card rounded-lg transition-colors">
                <Video className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-card rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          {messages.map((message, index) => {
            const isDriver = message.sender === "driver"
            return (
              <div key={message.id} className={`flex ${isDriver ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md ${
                    isDriver
                      ? "bg-accent text-primary rounded-3xl rounded-tr-none"
                      : "bg-card border border-border text-foreground rounded-3xl rounded-tl-none"
                  } px-4 py-3`}
                >
                  <p className="break-words text-sm">{message.text}</p>
                  <div
                    className={`flex items-center gap-1 mt-1 ${isDriver ? "text-primary/70" : "text-muted-foreground"} text-xs`}
                  >
                    <span>{message.timestamp}</span>
                    {isDriver && message.status && (
                      <span className="ml-1">
                        {message.status === "sent" && "✓"}
                        {message.status === "delivered" && "✓✓"}
                        {message.status === "read" && "✓✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Replies */}
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => {
                setMessageText(reply)
              }}
              className="flex-shrink-0 px-3 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:bg-card/80 hover:border-accent/50 transition-colors whitespace-nowrap"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border">
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSendMessage} className="flex items-end gap-3">
            <button type="button" className="flex-shrink-0 p-2 hover:bg-card rounded-lg transition-colors">
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="flex-1 relative flex items-end gap-2 bg-card border border-border rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background transition-all">
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="border-0 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground flex-1"
              />
              <button type="button" className="flex-shrink-0 p-1 hover:bg-card rounded-lg transition-colors">
                <Smile className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !messageText.trim()}
              className="flex-shrink-0 p-2 bg-accent hover:bg-accent/90 disabled:bg-accent/50 rounded-full transition-colors"
            >
              <Send className="w-5 h-5 text-primary" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

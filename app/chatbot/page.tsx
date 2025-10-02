"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, Mic, Volume2, MessageCircle, Clock, MapPin, Calendar, Heart, Sparkles } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  language?: string
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! I am your Divine Darshan AI assistant. How may I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("english")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickQuestions = [
    { text: "What is the current wait time?", icon: Clock },
    { text: "Show me the best darshan slot", icon: Calendar },
    { text: "Where is the nearest parking?", icon: MapPin },
    { text: "Tell me about temple history", icon: Heart },
  ]

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("wait") || lowerMessage.includes("time")) {
      return "The current wait time at Main Gate is approximately 15-20 minutes. However, the East Entrance has only a 5-minute wait. Would you like directions to the East Entrance?"
    }
    if (lowerMessage.includes("darshan") || lowerMessage.includes("slot")) {
      return "Based on current crowd levels, I recommend visiting between 6:00 AM - 7:00 AM for the shortest wait time. The morning slots are typically less crowded. Would you like me to book a slot for you?"
    }
    if (lowerMessage.includes("parking")) {
      return "Parking Lot B has 25 available spaces, just 200 meters from the East Gate. A shuttle service is available in 5 minutes. Parking Lot A is currently full."
    }
    if (lowerMessage.includes("history") || lowerMessage.includes("temple")) {
      return "This sacred temple was built in 1850 and is dedicated to Lord Shiva. The main sanctum features intricate carvings from the Solanki period. The temple has been a center of devotion for over 170 years. Would you like to book a guided history tour?"
    }
    if (lowerMessage.includes("prasad")) {
      return "Prasad is available at the counter near the Main Hall. You can also order prasad for home delivery through our Digital Seva service. The prasad includes sacred offerings blessed during the morning aarti."
    }
    if (lowerMessage.includes("prayer") || lowerMessage.includes("mantra")) {
      return "Om Namah Shivaya - This is the sacred five-syllable mantra dedicated to Lord Shiva. Chanting this mantra brings peace and spiritual awakening. Would you like to hear the proper pronunciation?"
    }
    if (lowerMessage.includes("wheelchair") || lowerMessage.includes("accessibility")) {
      return "The temple is fully wheelchair accessible. The East Entrance has ramps and dedicated wheelchair parking. Priority darshan queue access is available for differently-abled pilgrims. Medical assistance is available at all times."
    }
    if (lowerMessage.includes("emergency") || lowerMessage.includes("help") || lowerMessage.includes("medical")) {
      return "For emergencies, you can use the SOS button in the app or call our medical team at +91 98765 43210. Medical centers are located near the East Gate and Main Hall. Is this an emergency?"
    }

    return "I understand you are asking about temple services. I can help you with wait times, darshan bookings, parking information, temple history, and spiritual guidance. What would you like to know more about?"
  }

  const getTranslatedGreeting = (lang: string): string => {
    const greetings: Record<string, string> = {
      english: "Namaste! I am your Divine Darshan AI assistant. How may I help you today?",
      hindi: "नमस्ते! मैं आपका दिव्य दर्शन AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      gujarati: "નમસ્તે! હું તમારો દિવ્ય દર્શન AI સહાયક છું. આજે હું તમારી કેવી રીતે મદદ કરી શકું?",
      tamil: "வணக்கம்! நான் உங்கள் தெய்வீக தரிசன AI உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    }
    return greetings[lang] || greetings.english
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
  }

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang)
    const greeting: Message = {
      id: messages.length + 1,
      text: getTranslatedGreeting(newLang),
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, greeting])
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  AI Assistant
                </h1>
                <p className="text-sm text-muted-foreground">Multi-lingual spiritual & functional guidance</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी</SelectItem>
                  <SelectItem value="gujarati">ગુજરાતી</SelectItem>
                  <SelectItem value="tamil">தமிழ்</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="bg-green-500 text-white">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {quickQuestions.map((q, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto py-3 px-4 bg-transparent"
                      onClick={() => handleQuickQuestion(q.text)}
                    >
                      <q.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-left">{q.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <span className="font-semibold">You</span>
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card">
          <div className="container mx-auto px-4 py-4 max-w-4xl">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
                <Mic className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Ask me anything about the temple..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
                <Volume2 className="w-5 h-5" />
              </Button>
              <Button onClick={handleSend} size="icon" className="flex-shrink-0">
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI assistant can help with wait times, bookings, directions, and spiritual guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

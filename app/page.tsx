"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, MapPin, Users, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/beautiful-indian-temple-architecture-golden-hour.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Logo/Icon */}
        <div className="mb-8 animate-fade-in-up">
          <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center glow-gold border-4 border-white/30">
            <MapPin className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in-up text-balance drop-shadow-lg">
          DarshanMitr
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 animate-fade-in-up animation-delay-200 text-balance max-w-3xl font-medium">
          Technology for Safer Devotion
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 mb-12 animate-fade-in-up animation-delay-300 text-balance max-w-2xl leading-relaxed">
          AI-powered crowd management, safety, and spiritual engagement for Somnath, Dwarka, Ambaji, and Pavagadh
          temples
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="rounded-full px-12 py-7 text-xl font-semibold bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 glow-gold animate-fade-in-up animation-delay-400 shadow-2xl"
          asChild
        >
          <Link href="/auth">
            Get Started
            <Sparkles className="ml-2 w-6 h-6" />
          </Link>
        </Button>

        {/* Feature Pills */}
        <div className="mt-16 flex flex-wrap gap-4 justify-center animate-fade-in-up animation-delay-500">
          <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/30">
            <Users className="inline w-5 h-5 mr-2" />
            Live Crowd Tracking
          </div>
          <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/30">
            <Shield className="inline w-5 h-5 mr-2" />
            Emergency SOS
          </div>
          <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/30">
            <Sparkles className="inline w-5 h-5 mr-2" />
            AI Assistant
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

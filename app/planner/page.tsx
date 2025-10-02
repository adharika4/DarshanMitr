"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Armchair as Wheelchair,
  Heart,
  Coffee,
  Camera,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function PlannerPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    health: "good",
    mobility: "normal",
    groupSize: "1",
    visitDate: "",
    visitTime: "morning",
    preferences: [] as string[],
  })
  const [itinerary, setItinerary] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate personalized itinerary based on form data
    const generatedItinerary = {
      recommendedGate:
        formData.mobility === "wheelchair"
          ? "East Entrance (Wheelchair Accessible)"
          : formData.visitTime === "morning"
            ? "West Gate (Least Crowded)"
            : "Main Gate",
      darshanSlot:
        formData.visitTime === "morning"
          ? "6:00 AM - 7:00 AM"
          : formData.visitTime === "afternoon"
            ? "2:00 PM - 3:00 PM"
            : "6:00 PM - 7:00 PM",
      estimatedWait: formData.visitTime === "morning" ? "5-10 mins" : "15-20 mins",
      route: [
        { time: "6:00 AM", activity: "Arrive at West Gate", duration: "5 mins", icon: MapPin },
        { time: "6:05 AM", activity: "Security Check & Entry", duration: "10 mins", icon: CheckCircle2 },
        { time: "6:15 AM", activity: "Main Darshan Hall", duration: "30 mins", icon: Heart },
        { time: "6:45 AM", activity: "Prasad Collection", duration: "10 mins", icon: Coffee },
        { time: "6:55 AM", activity: "Temple Photography Area", duration: "15 mins", icon: Camera, optional: true },
        { time: "7:10 AM", activity: "Exit via East Gate", duration: "5 mins", icon: MapPin },
      ],
      restSpots: ["Shaded Rest Area near East Gate", "Drinking Water Station - Main Hall"],
      accessibility:
        formData.mobility === "wheelchair"
          ? [
              "Wheelchair ramps available at East Entrance",
              "Dedicated wheelchair parking",
              "Priority darshan queue access",
              "Accessible restrooms near Main Hall",
            ]
          : [],
      tips: [
        "Arrive 15 minutes early for smooth entry",
        "Keep your booking confirmation ready",
        "Photography is allowed in designated areas only",
        formData.health === "elderly" ? "Medical assistance available at all times" : null,
      ].filter(Boolean),
    }

    setItinerary(generatedItinerary)
    setStep(3)
  }

  const updatePreferences = (pref: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Personalized Journey Planner</h1>
              <p className="text-sm text-muted-foreground">Get a customized darshan itinerary based on your needs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Help us understand your needs for a better experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Health Condition</Label>
                <RadioGroup
                  value={formData.health}
                  onValueChange={(value) => setFormData({ ...formData, health: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good" className="font-normal cursor-pointer">
                      Good Health
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elderly" id="elderly" />
                    <Label htmlFor="elderly" className="font-normal cursor-pointer">
                      Elderly / Need Assistance
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medical" id="medical" />
                    <Label htmlFor="medical" className="font-normal cursor-pointer">
                      Medical Condition
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Mobility</Label>
                <RadioGroup
                  value={formData.mobility}
                  onValueChange={(value) => setFormData({ ...formData, mobility: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="font-normal cursor-pointer">
                      Normal Mobility
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wheelchair" id="wheelchair" />
                    <Label htmlFor="wheelchair" className="font-normal cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Wheelchair className="w-4 h-4" />
                        Wheelchair User
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <Select
                  value={formData.groupSize}
                  onValueChange={(value) => setFormData({ ...formData, groupSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3-5">3-5 People</SelectItem>
                    <SelectItem value="6+">6+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => setStep(2)} className="w-full" size="lg">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Visit Preferences */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Visit Preferences</CardTitle>
              <CardDescription>When would you like to visit and what interests you?</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="visitDate">Preferred Date</Label>
                    <Input
                      id="visitDate"
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Time</Label>
                    <Select
                      value={formData.visitTime}
                      onValueChange={(value) => setFormData({ ...formData, visitTime: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (6 AM - 10 AM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                        <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Additional Preferences (Optional)</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prasad"
                        checked={formData.preferences.includes("prasad")}
                        onCheckedChange={() => updatePreferences("prasad")}
                      />
                      <Label htmlFor="prasad" className="font-normal cursor-pointer">
                        Collect Prasad
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="photography"
                        checked={formData.preferences.includes("photography")}
                        onCheckedChange={() => updatePreferences("photography")}
                      />
                      <Label htmlFor="photography" className="font-normal cursor-pointer">
                        Temple Photography
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="history"
                        checked={formData.preferences.includes("history")}
                        onCheckedChange={() => updatePreferences("history")}
                      />
                      <Label htmlFor="history" className="font-normal cursor-pointer">
                        Temple History Tour
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="meditation"
                        checked={formData.preferences.includes("meditation")}
                        onCheckedChange={() => updatePreferences("meditation")}
                      />
                      <Label htmlFor="meditation" className="font-normal cursor-pointer">
                        Meditation Area Visit
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" size="lg">
                    Generate Itinerary
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Generated Itinerary */}
        {step === 3 && itinerary && (
          <div className="space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Your Personalized Itinerary</CardTitle>
                    <CardDescription className="mt-2">
                      Optimized for {formData.name} on{" "}
                      {new Date(formData.visitDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </div>
                  <Badge className="text-base px-4 py-2">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirmed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Details */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <MapPin className="w-4 h-4" />
                      Recommended Gate
                    </div>
                    <div className="font-semibold">{itinerary.recommendedGate}</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      Darshan Slot
                    </div>
                    <div className="font-semibold">{itinerary.darshanSlot}</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Users className="w-4 h-4" />
                      Expected Wait
                    </div>
                    <div className="font-semibold">{itinerary.estimatedWait}</div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Your Journey Timeline</h3>
                  <div className="space-y-4">
                    {itinerary.route.map((item: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5" />
                          </div>
                          {index < itinerary.route.length - 1 && <div className="w-0.5 h-full bg-border my-1 flex-1" />}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{item.activity}</span>
                            {item.optional && (
                              <Badge variant="secondary" className="text-xs">
                                Optional
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.time} • {item.duration}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accessibility Features */}
                {itinerary.accessibility.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wheelchair className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100">Accessibility Features</h3>
                    </div>
                    <ul className="space-y-2">
                      {itinerary.accessibility.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-200">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tips */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Helpful Tips</h3>
                  <ul className="space-y-2">
                    {itinerary.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="flex-1" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                    Download PDF
                  </Button>
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rest Spots */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Rest Spots</CardTitle>
                <CardDescription>Shaded areas and facilities along your route</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {itinerary.restSpots.map((spot: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Coffee className="w-4 h-4 text-primary" />
                      <span>{spot}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

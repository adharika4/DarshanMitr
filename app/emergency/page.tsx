"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  AlertTriangle,
  Phone,
  MapPin,
  Heart,
  Ambulance,
  Shield,
  CheckCircle2,
  Clock,
  Activity,
} from "lucide-react"

export default function EmergencyPage() {
  const [sosActive, setSosActive] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestHelp, setNearestHelp] = useState<any>(null)

  // Simulate getting user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Fallback to mock location
          setLocation({ lat: 23.0225, lng: 72.5714 })
        },
      )
    } else {
      setLocation({ lat: 23.0225, lng: 72.5714 })
    }
  }, [])

  const handleSOSPress = () => {
    setCountdown(3)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          activateSOS()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const activateSOS = () => {
    setSosActive(true)
    // Simulate finding nearest help
    setNearestHelp({
      type: "Medical Team",
      name: "Dr. Rajesh Kumar",
      distance: "120 meters",
      eta: "2 minutes",
      contact: "+91 98765 43210",
      location: "Near Main Darshan Hall",
    })
  }

  const cancelSOS = () => {
    setSosActive(false)
    setNearestHelp(null)
  }

  const emergencyContacts = [
    {
      title: "Medical Emergency",
      icon: Ambulance,
      number: "+91 98765 43210",
      description: "On-site medical team",
      color: "text-red-500",
    },
    {
      title: "Security",
      icon: Shield,
      number: "+91 98765 43211",
      description: "Temple security office",
      color: "text-blue-500",
    },
    {
      title: "Lost & Found",
      icon: MapPin,
      number: "+91 98765 43212",
      description: "Help desk",
      color: "text-orange-500",
    },
    {
      title: "General Help",
      icon: Phone,
      number: "+91 98765 43213",
      description: "Temple administration",
      color: "text-green-500",
    },
  ]

  const safetyTips = [
    "Stay hydrated, especially during summer months",
    "Follow crowd management instructions from staff",
    "Keep emergency contacts saved in your phone",
    "Inform family members of your location",
    "Use designated rest areas if feeling unwell",
    "Report any suspicious activity immediately",
  ]

  const medicalFacilities = [
    {
      name: "Main Medical Center",
      location: "Near East Gate",
      distance: "200m",
      facilities: ["First Aid", "Oxygen", "Wheelchair", "Ambulance"],
      available: true,
    },
    {
      name: "Emergency Station 1",
      location: "Darshan Hall",
      distance: "150m",
      facilities: ["First Aid", "Defibrillator"],
      available: true,
    },
    {
      name: "Emergency Station 2",
      location: "West Gate",
      distance: "350m",
      facilities: ["First Aid", "Oxygen"],
      available: true,
    },
  ]

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
              <h1 className="text-2xl font-bold text-foreground">Emergency & Safety</h1>
              <p className="text-sm text-muted-foreground">Quick access to help and safety resources</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* SOS Alert if Active */}
        {sosActive && nearestHelp && (
          <Alert className="mb-6 border-2 border-red-500 bg-red-50 dark:bg-red-950">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription>
              <div className="space-y-3">
                <div className="font-semibold text-red-900 dark:text-red-100 text-lg">SOS Alert Activated</div>
                <div className="text-red-800 dark:text-red-200">
                  <p className="mb-2">Help is on the way! {nearestHelp.type} has been notified.</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-semibold">Responder:</span> {nearestHelp.name}
                    </div>
                    <div>
                      <span className="font-semibold">Distance:</span> {nearestHelp.distance}
                    </div>
                    <div>
                      <span className="font-semibold">ETA:</span> {nearestHelp.eta}
                    </div>
                    <div>
                      <span className="font-semibold">Location:</span> {nearestHelp.location}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={cancelSOS}>
                    Cancel Alert
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${nearestHelp.contact}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Responder
                    </a>
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* SOS Button */}
        <Card className="mb-8 border-2 border-red-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Emergency SOS</CardTitle>
            <CardDescription>Press and hold for 3 seconds to alert nearest medical/security staff</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <button
              onMouseDown={handleSOSPress}
              onMouseUp={() => setCountdown(3)}
              onTouchStart={handleSOSPress}
              onTouchEnd={() => setCountdown(3)}
              disabled={sosActive}
              className={`w-48 h-48 rounded-full flex flex-col items-center justify-center font-bold text-2xl transition-all transform active:scale-95 ${
                sosActive
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white shadow-2xl hover:shadow-red-500/50"
              }`}
            >
              {sosActive ? (
                <>
                  <CheckCircle2 className="w-16 h-16 mb-2" />
                  <span>HELP SENT</span>
                </>
              ) : countdown < 3 ? (
                <>
                  <span className="text-6xl">{countdown}</span>
                  <span className="text-sm mt-2">Hold...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-16 h-16 mb-2" />
                  <span>PRESS SOS</span>
                </>
              )}
            </button>

            {location && (
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>
                    Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Location will be shared with emergency responders</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>Direct lines to temple emergency services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${contact.color}`}
                  >
                    <contact.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${contact.number}`}>
                        <Phone className="w-3 h-3 mr-2" />
                        {contact.number}
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medical Facilities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nearby Medical Facilities</CardTitle>
            <CardDescription>First aid and medical assistance locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {medicalFacilities.map((facility, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{facility.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {facility.location}
                        </span>
                        <span>{facility.distance} away</span>
                      </div>
                    </div>
                    <Badge
                      variant={facility.available ? "default" : "secondary"}
                      className={facility.available ? "bg-green-500" : ""}
                    >
                      {facility.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {facility.facilities.map((item, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Well-Being Monitor */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Health Monitoring</CardTitle>
            <CardDescription>For elderly pilgrims and those with health conditions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Activity className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">Wearable Integration Available</p>
                  <p className="text-sm text-muted-foreground">
                    Connect your smartwatch or fitness band to automatically alert medical staff if abnormal heart rate
                    or vitals are detected.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Connect Device
                  </Button>
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">72</div>
                <div className="text-xs text-muted-foreground">Heart Rate (BPM)</div>
                <Badge variant="secondary" className="mt-2 bg-green-500 text-white">
                  Normal
                </Badge>
              </div>
              <div className="p-4 rounded-lg bg-muted text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs text-muted-foreground">Blood Oxygen</div>
                <Badge variant="secondary" className="mt-2 bg-green-500 text-white">
                  Normal
                </Badge>
              </div>
              <div className="p-4 rounded-lg bg-muted text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">45</div>
                <div className="text-xs text-muted-foreground">Minutes Active</div>
                <Badge variant="secondary" className="mt-2">
                  Good
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
            <CardDescription>Stay safe during your temple visit</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

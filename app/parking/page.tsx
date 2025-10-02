"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Car, MapPin, Navigation, Clock, AlertCircle, CheckCircle2, Bus } from "lucide-react"

interface ParkingLot {
  id: string
  name: string
  total: number
  available: number
  distance: string
  shuttleAvailable: boolean
  shuttleETA: number
  price: string
  features: string[]
}

export default function ParkingPage() {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([
    {
      id: "1",
      name: "Parking Lot A",
      total: 150,
      available: 0,
      distance: "100m from Main Gate",
      shuttleAvailable: true,
      shuttleETA: 3,
      price: "Free",
      features: ["Covered", "Security", "CCTV"],
    },
    {
      id: "2",
      name: "Parking Lot B",
      total: 200,
      available: 45,
      distance: "200m from East Gate",
      shuttleAvailable: true,
      shuttleETA: 5,
      price: "Free",
      features: ["Open", "Security", "Wheelchair Access"],
    },
    {
      id: "3",
      name: "Parking Lot C",
      total: 120,
      available: 85,
      distance: "500m from West Gate",
      shuttleAvailable: true,
      shuttleETA: 8,
      price: "Free",
      features: ["Covered", "EV Charging", "Security"],
    },
    {
      id: "4",
      name: "VIP Parking",
      total: 50,
      available: 12,
      distance: "50m from Main Gate",
      shuttleAvailable: false,
      shuttleETA: 0,
      price: "₹100",
      features: ["Covered", "Valet", "Premium"],
    },
  ])

  const [trafficRoutes, setTrafficRoutes] = useState([
    { name: "Route A (Main Road)", status: "heavy", time: "25 mins", distance: "8 km" },
    { name: "Route B (Highway)", status: "moderate", time: "18 mins", distance: "12 km" },
    { name: "Route C (Bypass)", status: "clear", time: "15 mins", distance: "10 km" },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setParkingLots((prev) =>
        prev.map((lot) => ({
          ...lot,
          available: Math.max(0, Math.min(lot.total, lot.available + Math.floor(Math.random() * 10) - 5)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return "text-green-500"
    if (percentage > 20) return "text-orange-500"
    return "text-red-500"
  }

  const getTrafficColor = (status: string) => {
    switch (status) {
      case "clear":
        return "bg-green-500"
      case "moderate":
        return "bg-orange-500"
      case "heavy":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
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
              <h1 className="text-2xl font-bold text-foreground">Smart Parking & Traffic</h1>
              <p className="text-sm text-muted-foreground">Real-time parking availability and traffic updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Spaces</CardDescription>
              <CardTitle className="text-3xl">{parkingLots.reduce((sum, lot) => sum + lot.total, 0)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Car className="w-4 h-4" />
                <span>Across 4 lots</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Available Now</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {parkingLots.reduce((sum, lot) => sum + lot.available, 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ready to park</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Shuttle Service</CardDescription>
              <CardTitle className="text-3xl">3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bus className="w-4 h-4" />
                <span>Active shuttles</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Best Route</CardDescription>
              <CardTitle className="text-3xl">15m</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Navigation className="w-4 h-4" />
                <span>Via Route C</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parking Lots */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Live Parking Availability</CardTitle>
            <CardDescription>Updated in real-time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {parkingLots.map((lot) => {
              const percentage = (lot.available / lot.total) * 100
              const isAvailable = lot.available > 0

              return (
                <div key={lot.id} className="p-4 rounded-lg border-2 border-border hover:border-primary transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{lot.name}</h3>
                        {lot.id === "4" && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {lot.distance}
                        </span>
                        <span>•</span>
                        <span>{lot.price}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getStatusColor(lot.available, lot.total)}`}>
                        {lot.available}
                      </div>
                      <div className="text-sm text-muted-foreground">of {lot.total} available</div>
                    </div>
                  </div>

                  <Progress value={percentage} className="h-2 mb-3" />

                  <div className="flex flex-wrap gap-2 mb-3">
                    {lot.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {lot.shuttleAvailable && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Bus className="w-4 h-4" />
                      <span>Shuttle available in {lot.shuttleETA} minutes</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button className="flex-1" disabled={!isAvailable} variant={isAvailable ? "default" : "outline"}>
                      {isAvailable ? (
                        <>
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Full
                        </>
                      )}
                    </Button>
                    {isAvailable && <Button variant="outline">Reserve Spot</Button>}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Traffic Routes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Traffic Routes to Temple</CardTitle>
            <CardDescription>Choose the fastest route based on current traffic</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficRoutes.map((route, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                <div
                  className={`w-12 h-12 rounded-full ${getTrafficColor(route.status)} flex items-center justify-center flex-shrink-0`}
                >
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{route.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {route.time}
                    </span>
                    <span>•</span>
                    <span>{route.distance}</span>
                    <span>•</span>
                    <Badge
                      variant="outline"
                      className={`${
                        route.status === "clear"
                          ? "border-green-500 text-green-700 dark:text-green-400"
                          : route.status === "moderate"
                            ? "border-orange-500 text-orange-700 dark:text-orange-400"
                            : "border-red-500 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {route.status === "clear" ? "Clear" : route.status === "moderate" ? "Moderate" : "Heavy"}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline">
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Eco-Friendly Options */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-green-900 dark:text-green-100">Earn 100 Seva Points!</h2>
                <p className="text-green-800 dark:text-green-200 mb-4">
                  Use our eco-friendly shuttle service instead of private vehicles. Help reduce traffic congestion and
                  earn rewards.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Bus className="w-4 h-4 mr-2" />
                    Book Shuttle
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-700 dark:text-green-300 bg-transparent"
                  >
                    View Schedule
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

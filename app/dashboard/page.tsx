"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, AlertTriangle, TrendingUp, Clock, ArrowLeft, RefreshCw, Maximize2 } from "lucide-react"

interface ZoneData {
  id: string
  name: string
  capacity: number
  current: number
  status: "low" | "medium" | "high"
  prediction: string
  waitTime: number
}

export default function DashboardPage() {
  const [zones, setZones] = useState<ZoneData[]>([
    {
      id: "1",
      name: "Main Gate",
      capacity: 500,
      current: 420,
      status: "high",
      prediction: "Will be overcrowded in 15 mins",
      waitTime: 25,
    },
    {
      id: "2",
      name: "East Entrance",
      capacity: 400,
      current: 180,
      status: "low",
      prediction: "Optimal for next 45 mins",
      waitTime: 5,
    },
    {
      id: "3",
      name: "Darshan Hall",
      capacity: 800,
      current: 520,
      status: "medium",
      prediction: "Moderate crowd expected",
      waitTime: 15,
    },
    {
      id: "4",
      name: "Prasad Counter",
      capacity: 300,
      current: 280,
      status: "high",
      prediction: "Peak time - avoid for 20 mins",
      waitTime: 30,
    },
    {
      id: "5",
      name: "West Gate",
      capacity: 350,
      current: 120,
      status: "low",
      prediction: "Free flow - recommended",
      waitTime: 3,
    },
    {
      id: "6",
      name: "Prayer Area",
      capacity: 600,
      current: 340,
      status: "medium",
      prediction: "Steady crowd",
      waitTime: 12,
    },
  ])

  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setZones((prevZones) =>
        prevZones.map((zone) => {
          const change = Math.floor(Math.random() * 40) - 20
          const newCurrent = Math.max(0, Math.min(zone.capacity, zone.current + change))
          const percentage = (newCurrent / zone.capacity) * 100

          let status: "low" | "medium" | "high" = "low"
          if (percentage > 70) status = "high"
          else if (percentage > 40) status = "medium"

          return {
            ...zone,
            current: newCurrent,
            status,
            waitTime: Math.max(0, zone.waitTime + Math.floor(Math.random() * 6) - 3),
          }
        }),
      )
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-orange-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "low":
        return "Free Flow"
      case "medium":
        return "Moderate"
      case "high":
        return "Crowded"
      default:
        return "Unknown"
    }
  }

  const totalCapacity = zones.reduce((sum, zone) => sum + zone.capacity, 0)
  const totalCurrent = zones.reduce((sum, zone) => sum + zone.current, 0)
  const overallPercentage = (totalCurrent / totalCapacity) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Live Crowd Dashboard</h1>
                <p className="text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
                {autoRefresh ? "Auto" : "Manual"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Pilgrims</CardDescription>
              <CardTitle className="text-3xl">{totalCurrent.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>of {totalCapacity.toLocaleString()} capacity</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Overall Occupancy</CardDescription>
              <CardTitle className="text-3xl">{overallPercentage.toFixed(0)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={overallPercentage} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg Wait Time</CardDescription>
              <CardTitle className="text-3xl">
                {Math.round(zones.reduce((sum, z) => sum + z.waitTime, 0) / zones.length)} min
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Across all zones</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Crowded Zones</CardDescription>
              <CardTitle className="text-3xl">{zones.filter((z) => z.status === "high").length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>Requires attention</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3D Map Visualization */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>3D Temple Map - Real-Time Density</CardTitle>
                <CardDescription>Color-coded zones showing crowd levels</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4 mr-2" />
                Fullscreen
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted rounded-lg p-8 min-h-[500px] flex items-center justify-center">
              {/* 3D Map Simulation */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
                {zones.map((zone, index) => {
                  const percentage = (zone.current / zone.capacity) * 100
                  const height = Math.max(100, (percentage / 100) * 300)

                  return (
                    <div
                      key={zone.id}
                      className="relative group cursor-pointer"
                      style={{
                        transform: `perspective(1000px) rotateX(${10 + index * 2}deg) rotateY(${-5 + index * 3}deg)`,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        className={`${getStatusColor(zone.status)} rounded-lg shadow-2xl transition-all duration-500 hover:scale-105`}
                        style={{ height: `${height}px` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="font-bold text-lg mb-1">{zone.name}</div>
                          <div className="text-sm opacity-90">
                            {zone.current}/{zone.capacity}
                          </div>
                        </div>
                      </div>

                      {/* Hover Tooltip */}
                      <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="bg-card border-2 border-border rounded-lg p-3 shadow-xl whitespace-nowrap">
                          <div className="font-semibold mb-1">{zone.name}</div>
                          <div className="text-sm text-muted-foreground">Wait: {zone.waitTime} mins</div>
                          <div className="text-xs text-muted-foreground mt-1">{zone.prediction}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="text-sm font-semibold mb-2">Crowd Density</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span className="text-xs">Free Flow (0-40%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded" />
                    <span className="text-xs">Moderate (40-70%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span className="text-xs">Crowded (70-100%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zone Details */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone) => {
            const percentage = (zone.current / zone.capacity) * 100

            return (
              <Card key={zone.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{zone.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {zone.current} / {zone.capacity} people
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        zone.status === "high" ? "destructive" : zone.status === "medium" ? "secondary" : "default"
                      }
                      className={zone.status === "low" ? "bg-green-500 text-white hover:bg-green-600" : ""}
                    >
                      {getStatusText(zone.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-semibold">{percentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Wait Time</span>
                    <span className="font-semibold flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {zone.waitTime} mins
                    </span>
                  </div>

                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">{zone.prediction}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    disabled={zone.status === "high"}
                  >
                    {zone.status === "high" ? "Not Recommended" : "Get Directions"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* AI Predictions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>AI Crowd Predictions</CardTitle>
            <CardDescription>Forecasted crowd levels for the next 2 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium w-32">In 30 minutes:</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Progress value={65} className="flex-1 h-3" />
                    <span className="text-sm font-semibold w-12">65%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Main Gate will reach peak capacity</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium w-32">In 1 hour:</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="flex-1 h-3" />
                    <span className="text-sm font-semibold w-12">45%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Overall crowd expected to decrease</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium w-32">In 2 hours:</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Progress value={30} className="flex-1 h-3" />
                    <span className="text-sm font-semibold w-12">30%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Optimal time for darshan - all zones clear</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

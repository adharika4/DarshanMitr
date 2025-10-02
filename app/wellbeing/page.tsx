"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Heart,
  Activity,
  Droplets,
  Thermometer,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Watch,
} from "lucide-react"

export default function WellBeingPage() {
  const [heartRate, setHeartRate] = useState(72)
  const [oxygenLevel, setOxygenLevel] = useState(98)
  const [temperature, setTemperature] = useState(98.6)
  const [hydration, setHydration] = useState(75)
  const [connected, setConnected] = useState(true)

  // Simulate real-time vitals updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 4)))
      setOxygenLevel((prev) => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 1)))
      setTemperature((prev) => Math.max(97, Math.min(99, prev + (Math.random() - 0.5) * 0.2)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { status: "Low", color: "text-blue-500", bg: "bg-blue-500" }
    if (hr > 100) return { status: "High", color: "text-red-500", bg: "bg-red-500" }
    return { status: "Normal", color: "text-green-500", bg: "bg-green-500" }
  }

  const hrStatus = getHeartRateStatus(heartRate)

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
              <h1 className="text-2xl font-bold text-foreground">Well-Being Monitor</h1>
              <p className="text-sm text-muted-foreground">Real-time health tracking for your safety</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Connection Status */}
        <Card className="mb-6 border-2 border-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${connected ? "bg-green-500" : "bg-gray-400"} flex items-center justify-center`}
                >
                  <Watch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">{connected ? "Device Connected" : "No Device Connected"}</div>
                  <div className="text-sm text-muted-foreground">
                    {connected ? "Apple Watch Series 8" : "Connect your wearable device"}
                  </div>
                </div>
              </div>
              <Button variant={connected ? "outline" : "default"} onClick={() => setConnected(!connected)}>
                {connected ? "Disconnect" : "Connect Device"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Vitals */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className={`w-5 h-5 ${hrStatus.color}`} />
                  Heart Rate
                </CardTitle>
                <Badge className={`${hrStatus.bg} text-white`}>{hrStatus.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2">{Math.round(heartRate)}</div>
              <div className="text-sm text-muted-foreground mb-4">beats per minute</div>
              <Progress value={(heartRate / 120) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>60</span>
                <span>Normal: 60-100</span>
                <span>120</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Blood Oxygen
                </CardTitle>
                <Badge className="bg-green-500 text-white">Normal</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2">{Math.round(oxygenLevel)}%</div>
              <div className="text-sm text-muted-foreground mb-4">SpO2 level</div>
              <Progress value={oxygenLevel} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>90</span>
                <span>Normal: 95-100%</span>
                <span>100</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  Body Temperature
                </CardTitle>
                <Badge variant="secondary">Normal</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2">{temperature.toFixed(1)}°F</div>
              <div className="text-sm text-muted-foreground mb-4">body temperature</div>
              <Progress value={((temperature - 96) / 6) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>96°F</span>
                <span>Normal: 97-99°F</span>
                <span>102°F</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-cyan-500" />
                  Hydration Level
                </CardTitle>
                <Badge variant="secondary">Good</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2">{hydration}%</div>
              <div className="text-sm text-muted-foreground mb-4">estimated hydration</div>
              <Progress value={hydration} className="h-2" />
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full bg-transparent"
                onClick={() => setHydration(Math.min(100, hydration + 10))}
              >
                Log Water Intake
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Recommendations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Health Alerts & Recommendations</CardTitle>
            <CardDescription>Personalized suggestions based on your vitals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-green-900 dark:text-green-100">All vitals normal</div>
                <div className="text-sm text-green-800 dark:text-green-200">
                  Your health metrics are within healthy ranges
                </div>
              </div>
            </div>

            {hydration < 80 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-orange-900 dark:text-orange-100">Stay hydrated</div>
                  <div className="text-sm text-orange-800 dark:text-orange-200">
                    Drink water soon. Nearest water station: Main Hall (50m away)
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-blue-900 dark:text-blue-100">Take a rest</div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  You've been active for 45 minutes. Consider resting at the shaded area near East Gate.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-2 border-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg mb-1">Automatic Emergency Alert</div>
                <div className="text-sm text-muted-foreground">
                  Medical staff will be notified automatically if abnormal vitals are detected
                </div>
              </div>
              <Button variant="destructive" asChild>
                <Link href="/emergency">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Manual SOS
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

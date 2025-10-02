"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function InsightsPage() {
  const [selectedYear, setSelectedYear] = useState("2024")

  const crowdTrendData = [
    { month: "Jan", visitors: 45000, avgWait: 12 },
    { month: "Feb", visitors: 52000, avgWait: 15 },
    { month: "Mar", visitors: 68000, avgWait: 22 },
    { month: "Apr", visitors: 58000, avgWait: 18 },
    { month: "May", visitors: 72000, avgWait: 25 },
    { month: "Jun", visitors: 65000, avgWait: 20 },
    { month: "Jul", visitors: 78000, avgWait: 28 },
    { month: "Aug", visitors: 95000, avgWait: 35 },
    { month: "Sep", visitors: 82000, avgWait: 30 },
    { month: "Oct", visitors: 88000, avgWait: 32 },
    { month: "Nov", visitors: 92000, avgWait: 34 },
    { month: "Dec", visitors: 105000, avgWait: 40 },
  ]

  const festivalData = [
    { name: "Janmashtami", visitors: 125000, year: 2024 },
    { name: "Diwali", visitors: 98000, year: 2024 },
    { name: "Maha Shivaratri", visitors: 142000, year: 2024 },
    { name: "Navratri", visitors: 110000, year: 2024 },
    { name: "Holi", visitors: 85000, year: 2024 },
  ]

  const timeDistribution = [
    { time: "6-8 AM", percentage: 35, visitors: 28000 },
    { time: "8-10 AM", percentage: 25, visitors: 20000 },
    { time: "10-12 PM", percentage: 15, visitors: 12000 },
    { time: "12-2 PM", percentage: 8, visitors: 6400 },
    { time: "2-4 PM", percentage: 10, visitors: 8000 },
    { time: "4-6 PM", percentage: 12, visitors: 9600 },
    { time: "6-8 PM", percentage: 20, visitors: 16000 },
  ]

  const ageDistribution = [
    { name: "Children (0-12)", value: 15, color: "#3b82f6" },
    { name: "Youth (13-25)", value: 25, color: "#8b5cf6" },
    { name: "Adults (26-50)", value: 40, color: "#10b981" },
    { name: "Seniors (50+)", value: 20, color: "#f59e0b" },
  ]

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"]

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
              <h1 className="text-2xl font-bold text-foreground">Data Insights & Analytics</h1>
              <p className="text-sm text-muted-foreground">Historical trends and crowd analytics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Visitors (2024)</CardDescription>
              <CardTitle className="text-3xl">925K</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+15% from 2023</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Peak Festival</CardDescription>
              <CardTitle className="text-xl">Maha Shivaratri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">142,000 visitors</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg Wait Time</CardDescription>
              <CardTitle className="text-3xl">25m</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>-20% improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Satisfaction Rate</CardDescription>
              <CardTitle className="text-3xl">98%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Based on 12K surveys</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="trends">Crowd Trends</TabsTrigger>
            <TabsTrigger value="festivals">Festivals</TabsTrigger>
            <TabsTrigger value="timing">Best Times</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          {/* Crowd Trends */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Visitor Trends</CardTitle>
                <CardDescription>Visitor count and average wait times throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={crowdTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="visitors"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Visitors"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgWait"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Avg Wait (mins)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Peak Months</CardTitle>
                  <CardDescription>Highest visitor months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">December</span>
                      <Badge className="bg-primary">105,000 visitors</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">August</span>
                      <Badge variant="secondary">95,000 visitors</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">November</span>
                      <Badge variant="secondary">92,000 visitors</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Off-Peak Months</CardTitle>
                  <CardDescription>Best months for shorter waits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">January</span>
                      <Badge className="bg-green-500">12 min wait</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">February</span>
                      <Badge variant="secondary">15 min wait</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">April</span>
                      <Badge variant="secondary">18 min wait</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Festival Data */}
          <TabsContent value="festivals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Festival Crowd Comparison</CardTitle>
                <CardDescription>Visitor count during major festivals in 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={festivalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#8b5cf6" name="Visitors" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Festival Insights</CardTitle>
                <CardDescription>Historical data and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-1">Maha Shivaratri</h3>
                        <p className="text-sm text-muted-foreground">
                          Consistently draws 2x more crowd than other festivals. Plan to visit early morning (4-6 AM)
                          for best experience.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-1">Growing Popularity</h3>
                        <p className="text-sm text-muted-foreground">
                          Janmashtami celebrations have grown 25% year-over-year. Consider booking slots 2 weeks in
                          advance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Best Times */}
          <TabsContent value="timing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Distribution by Time</CardTitle>
                <CardDescription>When pilgrims typically visit throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={timeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#10b981" name="Visitors" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-500">
                <CardHeader>
                  <Badge className="w-fit bg-green-500">Best Time</Badge>
                  <CardTitle className="text-2xl mt-2">6-8 AM</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    35% of daily visitors. Shortest wait times and pleasant weather. Highly recommended.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit" variant="secondary">
                    Moderate
                  </Badge>
                  <CardTitle className="text-2xl mt-2">6-8 PM</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    20% of daily visitors. Evening aarti attracts crowds. Plan for 20-25 min wait.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-orange-500">Avoid</Badge>
                  <CardTitle className="text-2xl mt-2">10-12 PM</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Peak heat and moderate crowds. Consider visiting earlier or later for better experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Demographics */}
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                  <CardDescription>Visitor demographics by age group</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={ageDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ageDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Demographics Insights</CardTitle>
                  <CardDescription>Understanding our pilgrims</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                    <div className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Adults (26-50)</div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      Largest group at 40%. Often visit with families on weekends.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                    <div className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Youth (13-25)</div>
                    <div className="text-sm text-purple-800 dark:text-purple-200">
                      25% of visitors. High engagement with digital features and VR experiences.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                    <div className="font-semibold text-orange-900 dark:text-orange-100 mb-1">Seniors (50+)</div>
                    <div className="text-sm text-orange-800 dark:text-orange-200">
                      20% of visitors. Benefit most from accessibility features and health monitoring.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Visitor Origin</CardTitle>
                <CardDescription>Where our pilgrims come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted text-center">
                    <div className="text-3xl font-bold text-primary mb-1">65%</div>
                    <div className="text-sm text-muted-foreground">Local (within 50km)</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted text-center">
                    <div className="text-3xl font-bold text-secondary mb-1">25%</div>
                    <div className="text-sm text-muted-foreground">Regional (50-200km)</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted text-center">
                    <div className="text-3xl font-bold text-accent mb-1">10%</div>
                    <div className="text-sm text-muted-foreground">Interstate/International</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

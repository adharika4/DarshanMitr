"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  Droplets,
  Gift,
  Heart,
  MapPin,
  MapPinned,
  Menu,
  MessageCircle,
  Music,
  Navigation,
  Phone,
  Send,
  Shield,
  Sparkles,
  Star,
  Thermometer,
  Trophy,
  Users,
  Video,
  Wind,
  X,
  Zap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function HubPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [crowdDensity, setCrowdDensity] = useState(65)
  const [waitTime, setWaitTime] = useState(18)
  const [sevaPoints, setSevaPoints] = useState(120)
  const [queuePosition, setQueuePosition] = useState(45)
  const [heartRate, setHeartRate] = useState(78)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sosActive, setSosActive] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([{ type: "bot", text: "Namaste! How can I assist you today?" }])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [itineraryVisible, setItineraryVisible] = useState(false)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate real-time updates
      setCrowdDensity((prev) => Math.max(30, Math.min(95, prev + (Math.random() - 0.5) * 5)))
      setWaitTime((prev) => Math.max(5, Math.min(45, prev + (Math.random() - 0.5) * 2)))
      setQueuePosition((prev) => Math.max(1, prev - Math.floor(Math.random() * 2)))
      setHeartRate((prev) => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 3)))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const handleSOS = () => {
    setSosActive(true)
    setTimeout(() => {
      alert(
        "Emergency alert sent! Security and medical teams have been notified. Your GPS location has been shared. Help is on the way.",
      )
      setSosActive(false)
    }, 2000)
  }

  const handleLogout = () => {
    router.push("/")
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    setChatMessages((prev) => [...prev, { type: "user", text: chatInput }])
    setChatInput("")
    setIsTyping(true)

    setTimeout(() => {
      const responses: Record<string, string> = {
        wait: `Current wait time at Gate 2 is ${waitTime} minutes. Gate 3 has a shorter wait of ${Math.max(5, waitTime - 5)} minutes.`,
        parking: "Lot A has 45 spots available. Lot C has 92 spots available. I recommend Lot C for easier access.",
        prayer: "Om Namah Shivaya - May Lord Shiva bless you with peace and prosperity. 🙏",
        time: "Morning Aarti is at 6:30 AM. Evening Aarti is at 7:00 PM. Both are beautiful experiences!",
        help: "I can help you with: Wait times, Parking info, Prayers & mantras, Temple timings, Directions, and Emergency contacts.",
      }

      const lowerInput = chatInput.toLowerCase()
      let response =
        "I can help you with wait times, parking, prayers, temple timings, and emergency contacts. What would you like to know?"

      for (const [key, value] of Object.entries(responses)) {
        if (lowerInput.includes(key)) {
          response = value
          break
        }
      }

      setChatMessages((prev) => [...prev, { type: "bot", text: response }])
      setIsTyping(false)
    }, 1500)
  }

  const temples = [
    { name: "Somnath", density: 72, status: "moderate" },
    { name: "Dwarka", density: 45, status: "low" },
    { name: "Ambaji", density: 88, status: "high" },
    { name: "Pavagadh", density: 58, status: "moderate" },
  ]

  const getDensityColor = (density: number) => {
    if (density < 50) return "bg-chart-4"
    if (density < 75) return "bg-chart-5"
    return "bg-destructive"
  }

  const getDensityText = (density: number) => {
    if (density < 50) return "Free Flow"
    if (density < 75) return "Moderate"
    return "Crowded"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-secondary via-primary to-accent backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">DarshanMitr</h1>
                <p className="text-xs text-white/80">Welcome, Devotee</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 text-white">
              <a href="#crowd" className="text-sm font-medium hover:text-white/80 transition-colors">
                Crowd Map
              </a>
              <a href="#planner" className="text-sm font-medium hover:text-white/80 transition-colors">
                Planner
              </a>
              <a href="#queue" className="text-sm font-medium hover:text-white/80 transition-colors">
                Queue
              </a>
              <a href="#traffic" className="text-sm font-medium hover:text-white/80 transition-colors">
                Traffic
              </a>
              <a href="#seva-points" className="text-sm font-medium hover:text-white/80 transition-colors">
                Seva Points
              </a>
              <a href="#engagement" className="text-sm font-medium hover:text-white/80 transition-colors">
                Engagement
              </a>
              <a href="#emergency" className="text-sm font-medium hover:text-white/80 transition-colors">
                Emergency
              </a>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full"
              >
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3 text-white">
              <a href="#crowd" className="block text-sm font-medium">
                Crowd Map
              </a>
              <a href="#planner" className="block text-sm font-medium">
                Planner
              </a>
              <a href="#queue" className="block text-sm font-medium">
                Queue
              </a>
              <a href="#traffic" className="block text-sm font-medium">
                Traffic
              </a>
              <a href="#seva-points" className="block text-sm font-medium">
                Seva Points
              </a>
              <a href="#engagement" className="block text-sm font-medium">
                Engagement
              </a>
              <a href="#emergency" className="block text-sm font-medium">
                Emergency
              </a>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* a) Crowd Dashboard */}
        <section id="crowd">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Live Crowd Dashboard
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {temples.map((temple, idx) => (
              <Card key={idx} className="neumorphic border-0 hover:scale-105 transition-transform">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {temple.name}
                    <MapPin className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Density</span>
                        <span className="font-semibold">{temple.density}%</span>
                      </div>
                      <Progress value={temple.density} className="h-2" />
                    </div>
                    <Badge className={`${getDensityColor(temple.density)} text-white border-0`}>
                      {getDensityText(temple.density)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Live Crowd Video Card */}
          <Card className="neumorphic border-0">
            <CardContent>
              <div className="aspect-video relative rounded-xl overflow-hidden">
                {/* Video Background */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="api_thumb_600.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Heatmap Zones */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-chart-4/60 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-20 right-20 w-40 h-40 bg-chart-5/60 rounded-full blur-3xl animate-pulse animation-delay-300" />
                <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-destructive/60 rounded-full blur-3xl animate-pulse animation-delay-500" />

                {/* Content Overlay */}
                <div className="relative z-10 text-center space-y-4">
                  <Users className="w-16 h-16 mx-auto text-primary" />
                  <div>
                    <div className="text-4xl font-bold text-foreground">{Math.round(crowdDensity)}%</div>
                    <div className="text-muted-foreground">Current Density</div>
                  </div>
                  <div className="flex gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-chart-4 rounded-full" />
                      <span>Safe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-chart-5 rounded-full" />
                      <span>Moderate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive rounded-full" />
                      <span>Crowded</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-muted/50 border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">{waitTime} min</div>
                        <div className="text-sm text-muted-foreground">Predicted Wait</div>
                      </div>
                      <Clock className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-secondary">Gate 2</div>
                        <div className="text-sm text-muted-foreground">Safe Entry Gate</div>
                      </div>
                      <Navigation className="w-8 h-8 text-secondary" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50 border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-accent">2,450</div>
                        <div className="text-sm text-muted-foreground">Pilgrims Today</div>
                      </div>
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* b) Personalized Pilgrim Planner */}
        <section id="planner">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Personalized Pilgrim Planner
          </h2>

          <Card className="neumorphic border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Plan Your Visit
              </CardTitle>
              <CardDescription>Get a customized itinerary based on your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Age Group</Label>
                    <Select defaultValue="adult">
                      <SelectTrigger className="neumorphic-inset border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="child">Child (0-12)</SelectItem>
                        <SelectItem value="adult">Adult (13-60)</SelectItem>
                        <SelectItem value="senior">Senior (60+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Health Condition</Label>
                    <Select defaultValue="good">
                      <SelectTrigger className="neumorphic-inset border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="needs-assistance">Needs Assistance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Accessibility Needs</Label>
                    <Select defaultValue="none">
                      <SelectTrigger className="neumorphic-inset border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="wheelchair">Wheelchair</SelectItem>
                        <SelectItem value="walking-aid">Walking Aid</SelectItem>
                        <SelectItem value="visual">Visual Impairment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Temple</Label>
                    <Select defaultValue="somnath">
                      <SelectTrigger className="neumorphic-inset border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="somnath">Somnath</SelectItem>
                        <SelectItem value="dwarka">Dwarka</SelectItem>
                        <SelectItem value="ambaji">Ambaji</SelectItem>
                        <SelectItem value="pavagadh">Pavagadh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={()=>setItineraryVisible(!itineraryVisible)} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full">
                    Generate Itinerary
                  </Button>
                </div>
                {itineraryVisible &&<Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Suggested Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">6:00 AM - Arrival</div>
                        <div className="text-sm text-muted-foreground">Enter through Gate 2 (least crowded)</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <div className="font-semibold">6:30 AM - Morning Aarti</div>
                        <div className="text-sm text-muted-foreground">Participate in the divine ceremony</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold">7:00 AM - Darshan</div>
                        <div className="text-sm text-muted-foreground">Wheelchair accessible route available</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-chart-4/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-chart-4" />
                      </div>
                      <div>
                        <div className="font-semibold">8:00 AM - Rest Area</div>
                        <div className="text-sm text-muted-foreground">Shaded seating with water facility</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>}

                
              </div>
            </CardContent>
          </Card>
        </section>

        {/* c) Virtual Queue & Darshan */}
        <section id="queue">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Virtual Queue & Darshan
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="neumorphic border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-secondary" />
                  Queue Booking
                </CardTitle>
                <CardDescription>Book your darshan slot in advance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Input type="date" className="neumorphic-inset border-0" />
                </div>
                <div className="space-y-2">
                  <Label>Select Time Slot</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="neumorphic border-0 hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                    >
                      6:00 AM
                    </Button>
                    <Button
                      variant="outline"
                      className="neumorphic border-0 hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                    >
                      8:00 AM
                    </Button>
                    <Button
                      variant="outline"
                      className="neumorphic border-0 hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                    >
                      10:00 AM
                    </Button>
                    <Button
                      variant="outline"
                      className="neumorphic border-0 hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                    >
                      12:00 PM
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90 rounded-full">
                  Book Queue Slot
                </Button>
              </CardContent>
            </Card>

            <Card className="neumorphic border-0 bg-gradient-to-br from-secondary/10 to-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-secondary" />
                  Your Queue Ticket
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-bold text-secondary">#{queuePosition}</div>
                  <div className="text-muted-foreground">Your Position in Queue</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Estimated Wait</span>
                    <span className="font-semibold text-lg">{Math.round(queuePosition * 0.5)} min</span>
                  </div>
                  <Progress value={((100 - queuePosition) / 100) * 100} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Started</span>
                    <span>Your Turn Soon</span>
                  </div>
                </div>
                <Badge className="w-full justify-center py-2 bg-chart-4 text-white border-0">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Queue Active
                </Badge>
              </CardContent>
            </Card>
          </div>

          <Card className="neumorphic border-0 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-6 h-6 text-accent" />
                VR Darshan Preview
              </CardTitle>
              <CardDescription>Experience virtual darshan while you wait</CardDescription>
            </CardHeader>
            <CardContent>
  <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/Kw6J7e8lTDM?list=RDKw6J7e8lTDM"
      title="VR Darshan Preview"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</CardContent>
          </Card>
        </section>

        {/* d) Gamification (Seva Points) */}
        <section id="seva-points">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Seva Points & Rewards
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="neumorphic border-0 md:col-span-1">
              <CardHeader>
                <CardTitle className="text-center">Your Seva Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative w-40 h-40 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(sevaPoints / 200) * 440} 440`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="oklch(0.68 0.18 55)" />
                        <stop offset="100%" stopColor="oklch(0.85 0.15 95)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {sevaPoints}
                    </div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <Badge className="bg-secondary text-secondary-foreground border-0">
                    <Award className="w-4 h-4 mr-1" />
                    Silver Devotee
                  </Badge>
                  <div className="text-sm text-muted-foreground">80 points to Gold</div>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorphic border-0 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Earn More Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Follow Queue Time</div>
                      <div className="text-sm text-muted-foreground mb-2">Arrive on scheduled time</div>
                      <Badge className="bg-primary text-primary-foreground border-0">+10 Points</Badge>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 rounded-xl bg-gradient-to-br from-chart-4/10 to-chart-4/5">
                    <div className="w-12 h-12 rounded-full bg-chart-4/20 flex items-center justify-center flex-shrink-0">
                      <Car className="w-6 h-6 text-chart-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Use Eco Transport</div>
                      <div className="text-sm text-muted-foreground mb-2">Take shuttle or carpool</div>
                      <Badge className="bg-chart-4 text-white border-0">+15 Points</Badge>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold">Help Others</div>
                      <div className="text-sm text-muted-foreground mb-2">Assist elderly pilgrims</div>
                      <Badge className="bg-secondary text-secondary-foreground border-0">+20 Points</Badge>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Complete Survey</div>
                      <div className="text-sm text-muted-foreground mb-2">Share your experience</div>
                      <Badge className="bg-accent text-accent-foreground border-0">+5 Points</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="neumorphic border-0 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-6 h-6 text-secondary" />
                Redeem Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border-2 border-secondary/30 hover:border-secondary transition-colors cursor-pointer">
                  <Trophy className="w-8 h-8 text-secondary mb-3" />
                  <div className="font-semibold mb-1">Priority Darshan</div>
                  <div className="text-sm text-muted-foreground mb-3">Skip the queue</div>
                  <Badge className="bg-secondary text-secondary-foreground border-0">50 Points</Badge>
                </div>
                <div className="p-4 rounded-xl border-2 border-accent/30 hover:border-accent transition-colors cursor-pointer">
                  <Car className="w-8 h-8 text-accent mb-3" />
                  <div className="font-semibold mb-1">Free Shuttle</div>
                  <div className="text-sm text-muted-foreground mb-3">Round trip pass</div>
                  <Badge className="bg-accent text-accent-foreground border-0">30 Points</Badge>
                </div>
                <div className="p-4 rounded-xl border-2 border-primary/30 hover:border-primary transition-colors cursor-pointer">
                  <Sparkles className="w-8 h-8 text-primary mb-3" />
                  <div className="font-semibold mb-1">Prasad Discount</div>
                  <div className="text-sm text-muted-foreground mb-3">20% off booking</div>
                  <Badge className="bg-primary text-primary-foreground border-0">25 Points</Badge>
                </div>
                <div className="p-4 rounded-xl border-2 border-chart-4/30 hover:border-chart-4 transition-colors cursor-pointer">
                  <Star className="w-8 h-8 text-chart-4 mb-3" />
                  <div className="font-semibold mb-1">VIP Lounge</div>
                  <div className="text-sm text-muted-foreground mb-3">2 hour access</div>
                  <Badge className="bg-chart-4 text-white border-0">100 Points</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* e) Emergency & Safety */}
        <section id="emergency">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-destructive to-chart-5 bg-clip-text text-transparent">
            Emergency & Safety
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="neumorphic border-0 border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Shield className="w-6 h-6" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-destructive" />
                    <div>
                      <div className="font-semibold">Temple Security</div>
                      <div className="text-sm text-muted-foreground">24/7 Available</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-destructive hover:bg-destructive/90 rounded-full">
                    Call
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-destructive" />
                    <div>
                      <div className="font-semibold">Medical Emergency</div>
                      <div className="text-sm text-muted-foreground">Ambulance Service</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-destructive hover:bg-destructive/90 rounded-full">
                    Call
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-destructive" />
                    <div>
                      <div className="font-semibold">Police Control Room</div>
                      <div className="text-sm text-muted-foreground">Local Police</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-destructive hover:bg-destructive/90 rounded-full">
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="neumorphic border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinned className="w-6 h-6 text-primary" />
                  Nearby Medical Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center relative">
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-destructive rounded-full animate-pulse animation-delay-300" />
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-destructive rounded-full animate-pulse animation-delay-500" />
                  <div className="text-center">
                      <img
          src="https://www.bing.com/th/id/OIP.F2JFQKdJlSoY_I38hxvSMgHaGD?w=232&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2"
          alt="Route A Map"
          className="w-120 h-120 rounded-lg object-cover"
        />
                    <MapPin className="w-12 h-12 mx-auto text-primary mb-2" />
                    <div className="font-semibold">3 Facilities Nearby</div>
                    <div className="text-sm text-muted-foreground">Within 2 km radius</div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Temple Medical Center</span>
                    <span className="text-muted-foreground">0.5 km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>City Hospital</span>
                    <span className="text-muted-foreground">1.2 km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Emergency Clinic</span>
                    <span className="text-muted-foreground">1.8 km</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="neumorphic border-0 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-accent" />
                Well-Being Monitor
              </CardTitle>
              <CardDescription>Real-time health tracking for your safety</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-8 h-8 text-destructive" />
                      <Badge className="bg-chart-4 text-white border-0">Normal</Badge>
                    </div>
                    <div className="text-3xl font-bold">{heartRate}</div>
                    <div className="text-sm text-muted-foreground">Heart Rate (bpm)</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Wind className="w-8 h-8 text-accent" />
                      <Badge className="bg-chart-4 text-white border-0">Good</Badge>
                    </div>
                    <div className="text-3xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">Oxygen Level</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-chart-5/10 to-chart-5/5 border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Thermometer className="w-8 h-8 text-chart-5" />
                      <Badge className="bg-chart-4 text-white border-0">Normal</Badge>
                    </div>
                    <div className="text-3xl font-bold">36.8°C</div>
                    <div className="text-sm text-muted-foreground">Temperature</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Droplets className="w-8 h-8 text-primary" />
                      <Badge className="bg-chart-5 text-white border-0">Low</Badge>
                    </div>
                    <div className="text-3xl font-bold">65%</div>
                    <div className="text-sm text-muted-foreground">Hydration</div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-chart-5/10 border border-chart-5/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-chart-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-chart-5">Hydration Alert</div>
                    <div className="text-sm text-muted-foreground">
                      Your hydration level is low. Please drink water at the nearest facility.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* f) Smart Traffic & Parking */}
        <section id="traffic">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent to-chart-4 bg-clip-text text-transparent">
            Smart Traffic & Parking
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="neumorphic border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-6 h-6 text-accent" />
                  Live Parking Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Lot A - Main Gate", total: 200, available: 45, status: "available" },
                  { name: "Lot B - Main Gate", total: 150, available: 0, status: "full" },
                  { name: "Lot C - West Wing", total: 180, available: 92, status: "available" },
                  { name: "Lot D - VIP Section", total: 50, available: 12, status: "filling" },
                ].map((lot, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{lot.name}</div>
                      <Badge
                        className={
                          lot.status === "full"
                            ? "bg-destructive text-white border-0"
                            : lot.status === "filling"
                              ? "bg-chart-5 text-white border-0"
                              : "bg-chart-4 text-white border-0"
                        }
                      >
                        {lot.status === "full" ? "Full" : `${lot.available} Available`}
                      </Badge>
                    </div>
                    <Progress value={(lot.available / lot.total) * 100} className="h-2" />
                    <div className="text-sm text-muted-foreground mt-1">
                      {lot.available} / {lot.total} spots
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="neumorphic border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-primary" />
                  Traffic Routes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
               
                <div className="aspect-square bg-gradient-to-br from-chart-4/20 via-chart-5/20 to-destructive/20 rounded-xl flex items-center justify-center relative">
                  <div className="absolute top-10 left-10 right-10 h-1 bg-chart-4 rounded-full" />
                  <div className="absolute top-1/2 left-10 right-10 h-1 bg-chart-5 rounded-full" />
                  <div className="absolute bottom-10 left-10 right-10 h-1 bg-destructive rounded-full" />
                  <div className="text-center">
                     <img
          src="https://www.bing.com/th/id/OIP.2Y6_U7Q3SO4noGfSs_332AHaE7?w=264&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2"
          alt="Route A Map"
          className="w-130 h-130 rounded-lg object-cover"
        />
                    <Navigation className="w-12 h-12 mx-auto text-primary mb-2" />
                     
                    <div className="font-semibold">3 Routes Available</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-chart-4/10 border border-chart-4/30">
                   
                    <div>
                      <div className="font-semibold text-chart-4">Route A - Highway</div>
                      <div className="text-sm text-muted-foreground">Fastest, light traffic</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-chart-4">12 min</div>
                      <div className="text-xs text-muted-foreground">8.5 km</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-chart-5/10 border border-chart-5/30">
                    <div>
                      <div className="font-semibold text-chart-5">Route B - City Road</div>
                      <div className="text-sm text-muted-foreground">Moderate traffic</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-chart-5">18 min</div>
                      <div className="text-xs text-muted-foreground">6.2 km</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-accent to-chart-4 hover:opacity-90 rounded-full">
                  <Navigation className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="neumorphic border-0 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-6 h-6 text-secondary" />
                Shuttle Service
              </CardTitle>
              <CardDescription>Eco-friendly transport between parking and temple</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-chart-4/10 to-chart-4/5 border border-chart-4/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-chart-4/20 flex items-center justify-center">
                      <Car className="w-5 h-5 text-chart-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Shuttle #1</div>
                      <Badge className="bg-chart-4 text-white border-0 text-xs">En Route</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Arrives in 3 minutes</div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Car className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Shuttle #2</div>
                      <Badge className="bg-accent text-accent-foreground border-0 text-xs">Loading</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Departs in 5 minutes</div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Car className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Shuttle #3</div>
                      <Badge className="bg-primary text-primary-foreground border-0 text-xs">Available</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Ready to board</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* g) Engagement (AR/VR + Culture) */}
        <section id="engagement">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Spiritual Engagement
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="neumorphic border-0 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-16 h-16 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">Temple History</CardTitle>
                <CardDescription>Discover the ancient stories and legends</CardDescription>
              </CardContent>
            </Card>

            <Card className="neumorphic border-0 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6">
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Music className="w-16 h-16 text-accent" />
                </div>
                <CardTitle className="text-lg mb-2">Devotional Music</CardTitle>
                <CardDescription>Listen to sacred bhajans and mantras</CardDescription>
              </CardContent>
            </Card>

            <Card className="neumorphic border-0 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6">
                <div className="aspect-square bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-16 h-16 text-secondary" />
                </div>
                <CardTitle className="text-lg mb-2">Festival Calendar</CardTitle>
                <CardDescription>Upcoming celebrations and special events</CardDescription>
              </CardContent>
            </Card>

            <Card className="neumorphic border-0 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6">
                <div className="aspect-square bg-gradient-to-br from-chart-4/20 to-chart-5/20 rounded-xl flex items-center justify-center mb-4">
                  <Video className="w-16 h-16 text-chart-4" />
                </div>
                <CardTitle className="text-lg mb-2">Live Aarti Stream</CardTitle>
                <CardDescription>Watch morning and evening ceremonies</CardDescription>
              </CardContent>
            </Card>

            <Card className="neumorphic border-0 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-16 h-16 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">Meditation Guide</CardTitle>
                <CardDescription>Guided spiritual practices and yoga</CardDescription>
              </CardContent>
            </Card>

            <Card className="neumorphic border-0 hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6">
                <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-16 h-16 text-secondary" />
                </div>
                <CardTitle className="text-lg mb-2">Virtual Tour</CardTitle>
                <CardDescription>360° exploration of temple architecture</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-muted to-background py-12 border-t border-border mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg">DarshanMitr</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Faith meets Future – Safe Pilgrimage for All
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#crowd" className="hover:text-primary transition-colors">
                    Crowd Dashboard
                  </a>
                </li>
                <li>
                  <a href="#planner" className="hover:text-primary transition-colors">
                    Journey Planner
                  </a>
                </li>
                <li>
                  <a href="#queue" className="hover:text-primary transition-colors">
                    Virtual Queue
                  </a>
                </li>
                <li>
                  <a href="#emergency" className="hover:text-primary transition-colors">
                    Emergency
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Govt. of Gujarat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Emergency Helplines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Temples</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Somnath Temple</li>
                <li>Dwarka Temple</li>
                <li>Ambaji Temple</li>
                <li>Pavagadh Temple</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 DarshanMitr. Technology for Safer Devotion.</p>
          </div>
        </div>
      </footer>

      <button
        onClick={handleSOS}
        className={`fixed bottom-24 right-6 z-50 w-16 h-16 rounded-full bg-destructive text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${sosActive ? "animate-pulse scale-125" : ""}`}
        style={{
          boxShadow: sosActive ? "0 0 40px rgba(230, 57, 70, 0.8)" : "0 0 20px rgba(230, 57, 70, 0.4)",
        }}
      >
        <AlertTriangle className="w-8 h-8" />
      </button>

      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <Card className="w-80 sm:w-96 h-[500px] shadow-2xl border-2 border-accent/30 flex flex-col">
            <CardHeader className="bg-gradient-to-r from-accent to-primary text-white pb-3 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Spiritual Buddy</CardTitle>
                    <p className="text-xs text-white/80">AI Assistant</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-white hover:text-white/80">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-primary to-secondary text-white rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animation-delay-200" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animation-delay-300" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about wait times, parking..."
                  className="flex-1 neumorphic-inset border-0"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-accent to-primary hover:opacity-90 rounded-full px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => {
                    setChatInput("What is the wait time?")
                    setTimeout(handleSendMessage, 100)
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  Wait time?
                </button>
                <button
                  onClick={() => {
                    setChatInput("Tell me a prayer")
                    setTimeout(handleSendMessage, 100)
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  Prayer
                </button>
                <button
                  onClick={() => {
                    setChatInput("Parking availability")
                    setTimeout(handleSendMessage, 100)
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                >
                  Parking
                </button>
              </div>
            </div>
          </Card>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 glow-turquoise"
          >
            <MessageCircle className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize2, Eye, Headphones, BookOpen, Video } from "lucide-react"

export default function VRExperiencePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null)

  const experiences = [
    {
      id: "virtual-darshan",
      title: "360° Virtual Darshan",
      description: "Experience the divine darshan from the comfort of your location",
      duration: "5 mins",
      icon: Eye,
      thumbnail: "/temple-interior-360-view.jpg",
    },
    {
      id: "temple-history",
      title: "Temple History Tour",
      description: "Journey through 170 years of spiritual heritage",
      duration: "8 mins",
      icon: BookOpen,
      thumbnail: "/ancient-temple.png",
    },
    {
      id: "morning-aarti",
      title: "Morning Aarti Experience",
      description: "Witness the sacred morning prayer ceremony",
      duration: "12 mins",
      icon: Video,
      thumbnail: "/temple-aarti-ceremony.jpg",
    },
    {
      id: "meditation-guide",
      title: "Guided Meditation",
      description: "Find inner peace with guided meditation sessions",
      duration: "15 mins",
      icon: Headphones,
      thumbnail: "/meditation-peaceful-temple.jpg",
    },
  ]

  const audioStories = [
    {
      title: "The Legend of Lord Shiva",
      duration: "6 mins",
      narrator: "Pandit Ramesh Sharma",
    },
    {
      title: "Temple Construction Story",
      duration: "4 mins",
      narrator: "Dr. Priya Desai",
    },
    {
      title: "Sacred Mantras Explained",
      duration: "8 mins",
      narrator: "Swami Anand",
    },
    {
      title: "Festival Celebrations",
      duration: "5 mins",
      narrator: "Pandit Ramesh Sharma",
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
              <h1 className="text-2xl font-bold text-foreground">VR Experience</h1>
              <p className="text-sm text-muted-foreground">Immersive spiritual content while you wait</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {selectedExperience ? (
          // VR Player
          <div className="max-w-5xl mx-auto">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative bg-black aspect-video rounded-t-lg overflow-hidden">
                  <img
                    src={experiences.find((e) => e.id === selectedExperience)?.thumbnail || "/placeholder.svg"}
                    alt="VR Experience"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button size="lg" className="w-20 h-20 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Badge className="bg-black/60 text-white">{isPlaying ? "Playing" : "Paused"}</Badge>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="icon" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </Button>
                      <Button variant="secondary" size="icon">
                        <Maximize2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {experiences.find((e) => e.id === selectedExperience)?.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {experiences.find((e) => e.id === selectedExperience)?.description}
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={() => setSelectedExperience(null)} variant="outline">
                      Back to Library
                    </Button>
                    <Button>
                      <Eye className="w-4 h-4 mr-2" />
                      Enter VR Mode
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Experience Library
          <Tabs defaultValue="video" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="video">Video Experiences</TabsTrigger>
              <TabsTrigger value="audio">Audio Stories</TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Immersive Experiences</h2>
                <p className="text-muted-foreground">Explore the temple virtually while waiting in queue</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {experiences.map((exp) => (
                  <Card key={exp.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={exp.thumbnail || "/placeholder.svg"}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="lg" className="rounded-full" onClick={() => setSelectedExperience(exp.id)}>
                          <Play className="w-5 h-5 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-black/60 text-white">{exp.duration}</Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <exp.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{exp.title}</CardTitle>
                          <CardDescription className="mt-1">{exp.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Audio Stories</h2>
                <p className="text-muted-foreground">Listen to temple history and spiritual teachings</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {audioStories.map((story, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Headphones className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{story.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>Narrated by {story.narrator}</span>
                            <span>•</span>
                            <span>{story.duration}</span>
                          </div>
                        </div>
                        <Button>
                          <Play className="w-4 h-4 mr-2" />
                          Listen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Benefits Card */}
        {!selectedExperience && (
          <Card className="mt-12 max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 border-2">
            <CardContent className="p-8 text-center">
              <Eye className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Enhance Your Wait Time</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                While waiting in the virtual queue, immerse yourself in spiritual content. Learn about temple history,
                experience virtual darshan, or meditate with guided sessions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-base px-4 py-2">
                  <Eye className="w-4 h-4 mr-2" />
                  360° Views
                </Badge>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  <Headphones className="w-4 h-4 mr-2" />
                  Audio Guides
                </Badge>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  History Lessons
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

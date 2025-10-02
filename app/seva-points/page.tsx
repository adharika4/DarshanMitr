"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Award,
  TrendingUp,
  Gift,
  Clock,
  CheckCircle2,
  Star,
  Trophy,
  Zap,
  AlertCircle,
  Bus,
  Calendar,
} from "lucide-react"

export default function SevaPointsPage() {
  const [userPoints, setUserPoints] = useState(1250)
  const [userLevel, setUserLevel] = useState("Silver Devotee")
  const [nextLevelPoints, setNextLevelPoints] = useState(2000)

  const activities = [
    {
      id: 1,
      title: "Follow Digital Queue Timing",
      description: "Arrive within your scheduled slot",
      points: 50,
      icon: Clock,
      completed: true,
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "Use Eco-Friendly Shuttle",
      description: "Take temple shuttle instead of private vehicle",
      points: 100,
      icon: Bus,
      completed: true,
      date: "3 hours ago",
    },
    {
      id: 3,
      title: "Report Safety Issue",
      description: "Help maintain temple safety",
      points: 75,
      icon: AlertCircle,
      completed: false,
      date: null,
    },
    {
      id: 4,
      title: "Visit on Off-Peak Day",
      description: "Help balance crowd distribution",
      points: 150,
      icon: Calendar,
      completed: true,
      date: "Yesterday",
    },
    {
      id: 5,
      title: "Complete Profile",
      description: "Add health and accessibility info",
      points: 25,
      icon: CheckCircle2,
      completed: true,
      date: "2 days ago",
    },
  ]

  const rewards = [
    {
      id: 1,
      title: "Priority Darshan Slot",
      description: "Skip the regular queue on your next visit",
      points: 500,
      icon: Zap,
      category: "Premium",
      available: true,
    },
    {
      id: 2,
      title: "20% Off Dharamshala",
      description: "Discount on temple accommodation",
      points: 300,
      icon: Gift,
      category: "Accommodation",
      available: true,
    },
    {
      id: 3,
      title: "Free Prasad Delivery",
      description: "Get prasad delivered to your home",
      points: 200,
      icon: Gift,
      category: "Food",
      available: true,
    },
    {
      id: 4,
      title: "VIP Parking Access",
      description: "Reserved parking spot for one visit",
      points: 400,
      icon: Star,
      category: "Parking",
      available: true,
    },
    {
      id: 5,
      title: "Temple History Tour",
      description: "Guided tour with expert",
      points: 600,
      icon: Award,
      category: "Experience",
      available: false,
    },
    {
      id: 6,
      title: "Canteen Voucher",
      description: "Free meal at temple canteen",
      points: 150,
      icon: Gift,
      category: "Food",
      available: true,
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Rajesh Kumar", points: 5420, level: "Gold Devotee", avatar: "RK" },
    { rank: 2, name: "Priya Sharma", points: 4890, level: "Gold Devotee", avatar: "PS" },
    { rank: 3, name: "Amit Patel", points: 3650, level: "Silver Devotee", avatar: "AP" },
    { rank: 4, name: "You", points: userPoints, level: userLevel, avatar: "ME", isUser: true },
    { rank: 5, name: "Sunita Desai", points: 1180, level: "Bronze Devotee", avatar: "SD" },
  ]

  const achievements = [
    { title: "Early Bird", description: "Visited during morning hours 5 times", unlocked: true, icon: "🌅" },
    { title: "Eco Warrior", description: "Used shuttle service 10 times", unlocked: true, icon: "🌱" },
    { title: "Punctual Pilgrim", description: "Never missed a scheduled slot", unlocked: true, icon: "⏰" },
    { title: "Community Helper", description: "Reported 5 safety issues", unlocked: false, icon: "🤝" },
    { title: "Devotion Master", description: "Earned 5000 Seva Points", unlocked: false, icon: "🏆" },
  ]

  const progressToNextLevel = (userPoints / nextLevelPoints) * 100

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
              <h1 className="text-2xl font-bold text-foreground">Seva Points</h1>
              <p className="text-sm text-muted-foreground">Earn rewards for being a responsible pilgrim</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats Card */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold flex-shrink-0">
                <Trophy className="w-12 h-12" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <h2 className="text-3xl font-bold">{userPoints.toLocaleString()}</h2>
                  <Badge variant="secondary" className="text-base">
                    {userLevel}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{nextLevelPoints - userPoints} points to Gold Devotee</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress to next level</span>
                    <span className="font-semibold">{progressToNextLevel.toFixed(0)}%</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-3" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Visits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">8</div>
                  <div className="text-xs text-muted-foreground">Rewards</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">3</div>
                  <div className="text-xs text-muted-foreground">Badges</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="earn" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="earn">Earn Points</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Earn Points Tab */}
          <TabsContent value="earn" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ways to Earn Seva Points</CardTitle>
                <CardDescription>Complete these activities to earn points and unlock rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                      activity.completed
                        ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                        : "bg-card border-border hover:border-primary"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.completed ? "bg-green-500 text-white" : "bg-muted"
                      }`}
                    >
                      <activity.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-semibold">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        <Badge variant={activity.completed ? "default" : "secondary"} className="ml-2">
                          +{activity.points}
                        </Badge>
                      </div>
                      {activity.completed && activity.date && (
                        <div className="flex items-center gap-2 mt-2 text-xs text-green-700 dark:text-green-300">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed {activity.date}</span>
                        </div>
                      )}
                      {!activity.completed && (
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                          Learn More
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => {
                const canAfford = userPoints >= reward.points

                return (
                  <Card key={reward.id} className={`${!reward.available ? "opacity-60" : ""}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3`}>
                          <reward.icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="outline">{reward.category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{reward.title}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="font-bold text-lg">{reward.points}</span>
                          <span className="text-sm text-muted-foreground">points</span>
                        </div>
                        {canAfford && reward.available && <Badge className="bg-green-500">Available</Badge>}
                      </div>
                      <Button
                        className="w-full"
                        disabled={!canAfford || !reward.available}
                        variant={canAfford && reward.available ? "default" : "outline"}
                      >
                        {!reward.available
                          ? "Coming Soon"
                          : canAfford
                            ? "Redeem Now"
                            : `Need ${reward.points - userPoints} more`}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Unlock badges by completing special milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 ${
                        achievement.unlocked ? "bg-primary/5 border-primary" : "bg-muted/50 border-border"
                      }`}
                    >
                      <div className={`text-4xl ${!achievement.unlocked ? "grayscale opacity-50" : ""}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          {achievement.unlocked && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {!achievement.unlocked && (
                          <Badge variant="outline" className="mt-2">
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Devotees This Month</CardTitle>
                <CardDescription>See how you rank among other pilgrims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                        user.isUser ? "bg-primary/10 border-primary" : "bg-card border-border"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                          user.rank === 1
                            ? "bg-yellow-500 text-white"
                            : user.rank === 2
                              ? "bg-gray-400 text-white"
                              : user.rank === 3
                                ? "bg-orange-600 text-white"
                                : "bg-muted"
                        }`}
                      >
                        {user.rank <= 3 ? <Trophy className="w-5 h-5" /> : user.rank}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold flex items-center gap-2">
                          {user.name}
                          {user.isUser && <Badge variant="secondary">You</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.level}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{user.points.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Card */}
        <Card className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2">
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Keep Earning Seva Points!</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every responsible action you take helps create a better temple experience for everyone. Continue earning
              points and unlock exclusive rewards.
            </p>
            <Button size="lg" asChild>
              <Link href="/planner">Plan Your Next Visit</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { FlameIcon as Fire, TrendingUp, Hash, Clock } from "lucide-react"
import { samplePosts } from "@/lib/api"

// Extract topics from post content
function extractTopics() {
  const topics = samplePosts.map((post) => {
    const words = post.content.split(" ")
    return words[words.length - 1] // Get the last word as the topic
  })

  // Count occurrences of each topic
  const topicCounts: Record<string, number> = {}
  topics.forEach((topic) => {
    topicCounts[topic] = (topicCounts[topic] || 0) + 1
  })

  // Convert to array and sort by count
  return Object.entries(topicCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export default function Trending() {
  const topics = extractTopics()

  // Create hashtags from topics
  const hashtags = topics.map((topic) => ({
    name: `#${topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}`,
    value: topic.count * 5000 + Math.floor(Math.random() * 5000),
  }))

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Trending</h1>
      <p className="text-muted-foreground">Discover what's trending on your platform right now</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Topics</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topics.length}</div>
            <p className="text-xs text-muted-foreground">+24% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Posts</CardTitle>
            <Fire className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{samplePosts.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2%</div>
            <p className="text-xs text-muted-foreground">+3.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Trend Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36h</div>
            <p className="text-xs text-muted-foreground">+4h from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hashtags" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="hashtags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Hashtags</CardTitle>
              <CardDescription>Most popular hashtags in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <BarChart data={hashtags.slice(0, 5)} xAxisKey="name" yAxisKey="value" height={300} />
                </div>

                <div className="space-y-4">
                  {hashtags.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="font-medium">{index + 1}</div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {["Technology", "Marketing", "Business", "Creative", "Data"][index]}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{(item.value / 1000).toFixed(1)}K</div>
                          <div className="text-sm text-muted-foreground">Posts</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-500">+{Math.floor(Math.random() * 30) + 15}%</div>
                          <div className="text-sm text-muted-foreground">Growth</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
              <CardDescription>Most discussed topics across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <LineChart
                    data={topics.slice(0, 5).map((topic) => ({
                      name: topic.name.charAt(0).toUpperCase() + topic.name.slice(1),
                      value: topic.count * 5000 + Math.floor(Math.random() * 10000),
                    }))}
                    xAxisKey="name"
                    yAxisKey="value"
                    height={300}
                  />
                </div>

                <div className="space-y-4">
                  {topics.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="font-medium">{index + 1}</div>
                        <div>
                          <div className="font-medium">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                          <div className="text-sm text-muted-foreground">
                            Sentiment: {["Positive", "Neutral", "Positive", "Neutral", "Positive"][index]}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">
                            {(item.count * 5 + Math.floor(Math.random() * 5)).toFixed(1)}K
                          </div>
                          <div className="text-sm text-muted-foreground">Mentions</div>
                        </div>
                        <div className="text-right">
                          <Badge variant={index % 2 === 0 ? "default" : "secondary"}>
                            {index % 2 === 0 ? "Rising" : "Stable"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Posts</CardTitle>
              <CardDescription>Most engaging posts in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {samplePosts.slice(0, 5).map((post, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{post.content}</h3>
                        <div className="flex text-sm text-muted-foreground gap-2">
                          <span>@{userData[post.userid].toLowerCase().replace(" ", "")}</span>
                          <span>•</span>
                          <span>{Math.floor(Math.random() * 12) + 1} hours ago</span>
                        </div>
                      </div>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                    <div className="flex gap-6 mt-2">
                      <div className="text-sm">
                        <span className="font-medium">{(Math.random() * 10 + 2).toFixed(1)}K</span> Likes
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{(Math.random() * 3 + 0.5).toFixed(1)}K</span> Comments
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{(Math.random() * 5 + 1).toFixed(1)}K</span> Shares
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// User data from API
const userData: Record<string, string> = {
  "1": "John Doe",
  "2": "Jane Doe",
  "3": "Alice Smith",
  "4": "Bob Johnson",
  "5": "Charlie Brown",
  "6": "Diana White",
  "7": "Edward Davis",
  "8": "Fiona Miller",
  "9": "George Wilson",
  "10": "Helen Moore",
  "11": "Ivy Taylor",
  "12": "Jack Anderson",
  "13": "Kathy Thomas",
  "14": "Liam Jackson",
  "15": "Mona Harris",
  "16": "Nathan Clark",
  "17": "Olivia Lewis",
  "18": "Paul Walker",
  "19": "Quinn Scott",
  "20": "Rachel Young",
}

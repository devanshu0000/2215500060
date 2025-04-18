import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart } from "@/components/ui/chart"

// User data from API
const userData = {
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

// Convert to array for easier manipulation
const users = Object.entries(userData).map(([id, name]) => ({
  id,
  name,
  username: `@${name.toLowerCase().replace(" ", "")}`,
  avatar: `/placeholder.svg?height=40&width=40&text=${name.charAt(0)}`,
}))

export default function TopUsers() {
  // Generate random metrics for demonstration
  const influencers = users.slice(0, 5).map((user) => ({
    ...user,
    followers: `${Math.floor(Math.random() * 3000) + 500}K`,
    engagement: `${(Math.random() * 5 + 5).toFixed(1)}%`,
    category: ["Fashion", "Tech", "Food", "Travel", "Fitness"][Math.floor(Math.random() * 5)],
    verified: Math.random() > 0.5,
  }))

  const activeUsers = users.slice(5, 10).map((user) => ({
    ...user,
    posts: `${Math.floor(Math.random() * 300) + 100}`,
    comments: `${Math.floor(Math.random() * 1000) + 500}`,
    activity: ["Very High", "High", "Medium"][Math.floor(Math.random() * 3)],
  }))

  const growingUsers = users.slice(10, 15).map((user) => ({
    ...user,
    growth: `+${Math.floor(Math.random() * 200) + 100}%`,
    followers: `${Math.floor(Math.random() * 200) + 50}K`,
    joinDate: `${Math.floor(Math.random() * 10) + 1} months ago`,
  }))

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Top Users</h1>
      <p className="text-muted-foreground">Discover the most influential and active users on your platform</p>

      <Tabs defaultValue="influencers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="influencers">Influencers</TabsTrigger>
          <TabsTrigger value="active">Most Active</TabsTrigger>
          <TabsTrigger value="growing">Fastest Growing</TabsTrigger>
          <TabsTrigger value="all">All Users</TabsTrigger>
        </TabsList>

        <TabsContent value="influencers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Influence by Category</CardTitle>
                <CardDescription>Distribution of top influencers by category</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Fashion", value: 35 },
                    { name: "Tech", value: 25 },
                    { name: "Food", value: 20 },
                    { name: "Travel", value: 15 },
                    { name: "Fitness", value: 5 },
                  ]}
                  nameKey="name"
                  dataKey="value"
                  height={200}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Engagement Rate</CardTitle>
                <CardDescription>Average engagement rate of top influencers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px]">
                  <div className="text-center">
                    <div className="text-5xl font-bold">8.7%</div>
                    <p className="text-sm text-muted-foreground mt-2">Industry average: 3.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Audience Size</CardTitle>
                <CardDescription>Total audience reach of top influencers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px]">
                  <div className="text-center">
                    <div className="text-5xl font-bold">24.5M</div>
                    <p className="text-sm text-muted-foreground mt-2">Combined followers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Influencers</CardTitle>
              <CardDescription>Users with the highest engagement and reach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {influencers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="font-medium">{index + 1}</div>
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center">
                          {user.name}
                          {user.verified && (
                            <Badge variant="outline" className="ml-2">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.username}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{user.followers}</div>
                        <div className="text-sm text-muted-foreground">Followers</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{user.engagement}</div>
                        <div className="text-sm text-muted-foreground">Engagement</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{user.category}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Active Users</CardTitle>
              <CardDescription>Users with the highest activity on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="font-medium">{index + 1}</div>
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.username}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{user.posts}</div>
                        <div className="text-sm text-muted-foreground">Posts</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{user.comments}</div>
                        <div className="text-sm text-muted-foreground">Comments</div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            user.activity === "Very High"
                              ? "destructive"
                              : user.activity === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {user.activity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fastest Growing Users</CardTitle>
              <CardDescription>Users with the highest growth rate in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {growingUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="font-medium">{index + 1}</div>
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.username}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-green-500">{user.growth}</div>
                        <div className="text-sm text-muted-foreground">Growth</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{user.followers}</div>
                        <div className="text-sm text-muted-foreground">Followers</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Joined {user.joinDate}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Complete list of users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="font-medium text-muted-foreground">{user.id}</div>
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.username}</div>
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

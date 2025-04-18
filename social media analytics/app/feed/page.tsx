"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import { samplePosts, sampleComments, generateRandomComments, generatePostMetrics } from "@/lib/api"

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

// Generate random user IDs for comments
function getRandomUserId() {
  const userIds = Object.keys(userData)
  return userIds[Math.floor(Math.random() * userIds.length)]
}

export default function Feed() {
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({})
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    // Process the sample posts with metrics and user data
    const processedPosts = samplePosts.map((post) => {
      const postWithMetrics = generatePostMetrics(post)

      // Add author information
      const userId = post.userid.toString()
      return {
        ...postWithMetrics,
        author: {
          id: userId,
          name: userData[userId] || "Unknown User",
          username: `@${(userData[userId] || "unknown").toLowerCase().replace(" ", "")}`,
          avatar: `/placeholder.svg?height=40&width=40&text=${(userData[userId] || "U").charAt(0)}`,
          verified: Math.random() > 0.5,
        },
        // Add image for some posts
        image:
          Math.random() > 0.6 ? `/placeholder.svg?height=300&width=600&text=${post.content.split(" ").pop()}` : null,
        // Add comments
        comments: post.id === 150 ? sampleComments[150] : generateRandomComments(post.id),
      }
    })

    setPosts(processedPosts)
  }, [])

  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Feed</h1>
      <p className="text-muted-foreground">Your personalized social media feed with the latest updates</p>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {posts.map((post, index) => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center">
                          {post.author.name}
                          {post.author.verified && (
                            <Badge variant="outline" className="ml-2">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          {post.author.username} • {post.time}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="mb-3">{post.content}</p>
                  {post.image && (
                    <div className="rounded-md overflow-hidden mb-3">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post content"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag: string, tagIndex: number) => (
                      <Badge key={tagIndex} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col pt-2">
                  <div className="flex justify-between w-full">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => toggleComments(post.id)}>
                      <MessageCircle className="h-4 w-4" />
                      {post.comments.length}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      {post.shares}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Bookmark className={`h-4 w-4 ${post.saved ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  {/* Comments section */}
                  {expandedComments[post.id] && (
                    <div className="w-full mt-4 border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Comments ({post.comments.length})</h4>
                        <Button variant="ghost" size="sm" onClick={() => toggleComments(post.id)}>
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {post.comments.map((comment: any) => {
                          const commentUserId = getRandomUserId()
                          const commentUserName = userData[commentUserId]

                          return (
                            <div key={comment.id} className="flex gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={`/placeholder.svg?height=24&width=24&text=${commentUserName.charAt(0)}`}
                                  alt={commentUserName}
                                />
                                <AvatarFallback>{commentUserName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-muted rounded-md px-3 py-2">
                                  <div className="font-medium text-xs">{commentUserName}</div>
                                  <div className="text-sm">{comment.content}</div>
                                </div>
                                <div className="flex gap-4 mt-1">
                                  <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
                                  <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                                  <span className="text-xs text-muted-foreground">
                                    {Math.floor(Math.random() * 12) + 1}h
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {!expandedComments[post.id] && post.comments.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-muted-foreground w-full flex items-center justify-center"
                      onClick={() => toggleComments(post.id)}
                    >
                      View all {post.comments.length} comments
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Following Feed</CardTitle>
              <CardDescription>Posts from people you follow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Following feed content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Feed</CardTitle>
              <CardDescription>Most popular posts across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Popular feed content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Posts</CardTitle>
              <CardDescription>Posts you've bookmarked for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Saved posts content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

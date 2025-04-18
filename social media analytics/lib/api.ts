// API utility functions for fetching data

/**
 * Fetches users from the API
 */
export async function fetchUsers() {
  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/users")
    const data = await response.json()
    return data.users || {}
  } catch (error) {
    console.error("Error fetching users:", error)
    return {}
  }
}

/**
 * Formats user data for display
 */
export function formatUsers(userData: Record<string, string>) {
  return Object.entries(userData).map(([id, name]) => ({
    id,
    name,
    username: `@${name.toLowerCase().replace(" ", "")}`,
    avatar: `/placeholder.svg?height=40&width=40&text=${name.charAt(0)}`,
  }))
}

/**
 * Fetches posts for a specific user
 */
export async function fetchUserPosts(userId: string) {
  try {
    const response = await fetch(`http://20.244.56.144/evaluation-service/users/${userId}/posts`)
    const data = await response.json()
    return data.posts || []
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error)
    return []
  }
}

/**
 * Fetches comments for a specific post
 */
export async function fetchPostComments(postId: number) {
  try {
    const response = await fetch(`http://20.244.56.144/evaluation-service/posts/${postId}/comments`)
    const data = await response.json()
    return data.comments || []
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error)
    return []
  }
}

// Sample post data for John Doe (userid: 1)
export const samplePosts = [
  {
    id: 246,
    userid: 1,
    content: "Post about ant",
  },
  {
    id: 161,
    userid: 1,
    content: "Post about elephant",
  },
  {
    id: 150,
    userid: 1,
    content: "Post about ocean",
  },
  {
    id: 370,
    userid: 1,
    content: "Post about monkey",
  },
  {
    id: 344,
    userid: 1,
    content: "Post about ocean",
  },
  {
    id: 952,
    userid: 1,
    content: "Post about zebra",
  },
  {
    id: 647,
    userid: 1,
    content: "Post about igloo",
  },
  {
    id: 421,
    userid: 1,
    content: "Post about house",
  },
  {
    id: 890,
    userid: 1,
    content: "Post about bat",
  },
  {
    id: 461,
    userid: 1,
    content: "Post about umbrella",
  },
]

// Sample comments for post with id 150
export const sampleComments = {
  150: [
    {
      id: 3893,
      postid: 150,
      content: "Old comment",
    },
    {
      id: 4791,
      postid: 150,
      content: "Boring comment",
    },
  ],
}

// Generate random comments for posts without real comment data
export function generateRandomComments(postId: number) {
  const commentCount = Math.floor(Math.random() * 5) + 1
  const comments = []

  for (let i = 0; i < commentCount; i++) {
    comments.push({
      id: Math.floor(Math.random() * 10000),
      postid: postId,
      content: `Random comment ${i + 1} about this post`,
    })
  }

  return comments
}

// Generate random metrics for posts
export function generatePostMetrics(post: any) {
  return {
    ...post,
    likes: Math.floor(Math.random() * 1000) + 100,
    shares: Math.floor(Math.random() * 500) + 50,
    saved: Math.random() > 0.7,
    time: `${Math.floor(Math.random() * 24) + 1} hours ago`,
    tags: generateTagsFromContent(post.content),
  }
}

// Generate tags based on post content
function generateTagsFromContent(content: string) {
  const words = content.split(" ")
  const lastWord = words[words.length - 1]

  // Create a tag from the last word in the content
  const mainTag = lastWord.charAt(0).toUpperCase() + lastWord.slice(1)

  // Add some related tags
  const relatedTags = {
    ant: ["Insects", "Nature"],
    elephant: ["Wildlife", "Safari"],
    ocean: ["Nature", "Water"],
    monkey: ["Wildlife", "Animals"],
    zebra: ["Wildlife", "Safari"],
    igloo: ["Winter", "Architecture"],
    house: ["Home", "Architecture"],
    bat: ["Wildlife", "Night"],
    umbrella: ["Weather", "Accessories"],
  }

  return [mainTag, ...(relatedTags[lastWord.toLowerCase()] || ["Social", "Trending"])]
}

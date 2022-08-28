export {};

declare global {
  type User = {
    ID: number
    firstname: string
    lastname: string
    headline: string
    email: string
    phone: string
    imageUrl: string
    likedposts: Array<Number>
  }

  type UserState = {
    isSignedIn: boolean,
    user: User
  }

  type Post = {
    ID: number,
    content: string,
    attachments: string,
    likes: number,
    user: User,
    comments: Array<PostComment>
  }

  type PostComment = {
    ID: number,
    content: string,
    likes: number,
    user: User,
    post: Post
    replies: Array<PostReply>
  }

  type PostReply = {
    ID: number,
    content: string,
    user: User,
    comment: Comment
  }
}
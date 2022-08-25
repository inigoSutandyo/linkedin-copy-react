export {};

declare global {
  type User = {
    ID: number
    firstname: string
    lastname: string
    headline: string
    email: string
    phone: string
    likeposts: Array<Number>
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
    comments: PostComment
  }

  type PostComment = {
    ID: number,
    content: string,
    likes: number,
    user: User,
    post: Post
  }

  type PostReply = {
    ID: number,
    content: string,
    user: User,
    comment: Comment
  }
}
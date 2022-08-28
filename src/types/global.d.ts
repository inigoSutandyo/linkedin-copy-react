export {};

declare global {
  type User = {
    ID: number
    firstname: string
    lastname: string
    headline: string
    email: string
    phone: string
    image: Uint8Array
    imageUrl: string,
    imagemime: string,
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
    file: Uint8Array,
    fileUrl: string,
    mime: string,
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
export {};

declare global {
  interface User {
    ID: number
    firstname: string
    lastname: string
    headline: string
    email: string
    phone: string
    imageurl: string
    imageid: string
    likedposts: Array<Number>
    connections: Array<User>
    invitations: Array<Invitation>
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
    fileurl: string
    fileid: string
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
    isreply: boolean
    mention: User
  }

  type PostReply = {
    ID: number,
    content: string,
    likes: number,
    user: User,
    comment: Comment
    mention: User
  }

  type Invitation = {
    ID: number
    note: string
    source: User
    sourceid: number
    destinationid: number
  }
}
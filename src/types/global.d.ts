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
    educations: Array<Education>
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

  type Education = {
    ID: number
    institute: string
    degree: string
    fieldofstudy: string
    grade: string
    description: string
    activities: string
    user: User
    start: Date
    end: Date
  }
}
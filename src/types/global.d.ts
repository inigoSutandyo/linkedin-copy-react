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
    followings: Array<User>
    invitations: Array<Invitation>
    educations: Array<Education>
    experiences: Array<Experience>
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
    filetype: string 
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

  type Experience = {
    ID: number
    title: string
    company: string
    employmenttype: string
    location: string
    industry: string
    description: string
    isworking: boolean
    start: Date
    end: Date
    user: User
  }

  type Notif = {
    ID: number
    message: string
    from: User
    post: Post
    comment: Comment
  }

  type Job = {
    ID: number
    title: string
    company: string
    location: string
    description: string
  }

  type Chats = {
    ID: number
    users: Array<User>
  }

  type Message = {
    ID: number
    CreatedAt: Date
    user: User
    content: string
    post: Post
    postid: number
  }

  type MessageState = {
    messages: Array<Message>
    chatid: number
  }
}
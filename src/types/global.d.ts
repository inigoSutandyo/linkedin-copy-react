export {};

declare global {
  type User = {
    ID: number
    firstname: string
    lastname: string
    email: string
    phone: string
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
    user: User
  }
}
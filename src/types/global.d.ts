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
    user: User | null
  }
}
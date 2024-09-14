import { DefaultUser  } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    token?: string;
    role: string;
  }

  interface User extends DefaultUser {
    token: string;
    role: string;
  }

  
}
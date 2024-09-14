import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = {
          id: '1',
          email: credentials.email,
          token: 'asdasdasdasdas',
          role: 'admin' // or 'user'
        }

       
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        })
        console.log(response)
        if (!response.ok) {
         return null;
        }
        console.log(response)
        return await response.json()
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if(user) {
        token.token = user.token;
       ;
      }
      return token;
    },

    async session({ session, token }) {
       session.token = token.token as string;
       session.token = session.role 
      return session;
    }
  }
})

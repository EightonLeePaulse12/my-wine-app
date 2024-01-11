import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import 

export const authOpt: NextAuthOptions = {
    pages:{
        signIn: '/my-wine-app/app/api/auth/[...nextauth]/route.ts'
    },
    adapter:{
        PrismaAdapter()
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",

        credentials: {
          username: { label: "email", type: "email", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
    
          if (user) {
            return user
          } else {
            return null
    
          }
        }
      })
    ]
};

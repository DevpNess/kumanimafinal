import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
import prisma from "@/lib/prisma"
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@email.com" },
                password: { label: "Password", type: "password", placeholder: "********" }
            },
            async authorize(credentials) {

                let user = null

                const { email, password } = await signInSchema.parseAsync(credentials)

                user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })
                if (!user) throw new Error('No users found')
                if (password != user.password) throw new Error('Wrong password')



                    if (password != user.password)throw new Error('Wrong password')


                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            return {...token, ...user}
        },
        async session({session, token}){
            session.user = token as any
            return session
        }
    },
    pages:{
        signIn:'/auth/',
        newUser:'/auth/',

    }
})
export { handler as GET, handler as POST }
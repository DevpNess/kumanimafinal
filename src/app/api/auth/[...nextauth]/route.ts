import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// Proveedores externos:
import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import TwitterProvider from "next-auth/providers/twitter"
// import AppleProvider from "next-auth/providers/apple"
import { signInSchema } from "@/lib/zod"
import prisma from "@/lib/prisma"
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credenciales",
            credentials: {
                email: { label: "Correo electrónico", type: "email", placeholder: "usuario@email.com" },
                password: { label: "Contraseña", type: "password", placeholder: "********" }
            },
            async authorize(credentials) {
                let user = null
                const { email, password } = await signInSchema.parseAsync(credentials)
                user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })
                if (!user) throw new Error('No se encontró ningún usuario con ese correo')
                if (password != user.password) throw new Error('Contraseña incorrecta')
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
         GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         }),
        // FacebookProvider({
        //   clientId: process.env.FACEBOOK_CLIENT_ID!,
        //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        // }),
        // TwitterProvider({
        //   clientId: process.env.TWITTER_CLIENT_ID!,
        //   clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        // }),
        // AppleProvider({
        //   clientId: process.env.APPLE_CLIENT_ID!,
        //   clientSecret: process.env.APPLE_CLIENT_SECRET!,
        // }),
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
    },
    // Mensajes personalizados en español
    // Puedes personalizar más mensajes usando events o callbacks si lo deseas
    // Ejemplo: events: { signIn: async (message) => { ... } }
})
export { handler as GET, handler as POST }
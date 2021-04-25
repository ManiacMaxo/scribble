import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        }),
        Providers.Discord({
            clientId: process.env.DISCORD_ID ?? '',
            clientSecret: process.env.DISCORD_SECRET ?? ''
        })
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        async redirect(_url, baseUrl) {
            return baseUrl
        }
    }
})

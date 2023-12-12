import dbConnect from "@/utils/mongodb";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github"
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    secret: 'f4b112163e220b2faacc746879d4a325ec9948c8',
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: {  label: 'password', type: 'password' },
            },
            authorize: async (credentials) => {
                const { db } = await dbConnect();
                const user = await db.collection('users').findOne({ email: credentials.email });
        
                if (user && bcrypt.compareSync(credentials.password, user.passwordHash)) {
                    return user
                    //Promise.resolve(user);
                } else {
                    return null
                    //Promise.resolve(null);
                }
            }
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    database: process.env.MONGO_URL,
    debug: true
});

export {handler as GET, handler as POST}

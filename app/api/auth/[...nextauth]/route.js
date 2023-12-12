import connect from "@/utils/mongodb";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/user";
import Github from "next-auth/providers/github"
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        Credentials({
            id: "credentials",
            name: 'Credentials',
            async authorize(credentials) {
                await connect();
                const user = await User.findOne({ email: credentials.email });

                if (user) {
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                      } else {
                        throw new Error("Wrong Credentials!");
                    }
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
    database: process.env.MONGO_URL
});

export {handler as GET, handler as POST}

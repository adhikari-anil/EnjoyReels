import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDataBase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID!,
      clientSecret: process.env.GITHUB_CLIENTSECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID!,
      clientSecret: process.env.GOOGLE_CLIENTSECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing Email or Password.");
        }

        try {
          await connectToDataBase();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found.");
          }
          const isvalid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isvalid) {
            throw new Error("Invalid Password.");
          }
          return {
            id: user._id,
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        // User already exist..
        return true;
      }

      await connectToDataBase();
      // For OAuth...
      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          avatar_url: user?.image,
          provider: account?.provider,
          provider_id: account?.providerAccountId,
        });
      }
      user.id = dbUser._id.toString();
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

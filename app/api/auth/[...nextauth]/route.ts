import { authOptions } from "@/lib/option";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export {handler as get, handler as POST};
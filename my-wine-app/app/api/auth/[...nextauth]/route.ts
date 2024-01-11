import { authOpt } from "./../../../../lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth({ authOpt });

export { handler as GET, handler as POST };

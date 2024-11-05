import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, token }) {
      const baseSession = await authConfig.callbacks?.session({
        session,
        token,
      });

      if (baseSession.access_token) {
        baseSession.access_token = baseSession.access_token;
      }
      if (baseSession.id_token) {
        baseSession.id_token = baseSession.id_token;
      }

      return baseSession;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signOut: "/", // Redirect to home after signout
  }
});

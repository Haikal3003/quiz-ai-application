import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const db_user = await prisma.user.findFirst({
          where: { email: token.email },
        });

        if (db_user) {
          token.id = db_user.id;
          token.email = db_user.email;
          token.name = db_user.name;
          token.picture = db_user.image;
        }
      }

      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email ?? '';
        session.user.image = token.picture;
      }

      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});

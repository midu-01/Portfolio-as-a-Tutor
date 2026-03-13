import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const admin = await prisma.adminUser.findUnique({
          where: { email: parsedCredentials.data.email }
        });

        if (!admin) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          parsedCredentials.data.password,
          admin.passwordHash
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          image: admin.image,
          role: admin.role
        };
      }
    })
  ]
});

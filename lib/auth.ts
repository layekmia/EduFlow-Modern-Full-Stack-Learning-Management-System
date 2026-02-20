import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { env } from "./env";
import { customSession, emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { generateOTPTemplate } from "@/utils/EmailTemplate";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        defaultValue: "USER",
        required: true,
        input: false,
      },
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "EduFlow <contact@nexotechit.com>",
          to: [email],
          subject: "EduFlow - Verify your email",
          html: generateOTPTemplate({
            appName: "EduFlow LMS",
            otp,
          }),
        });
      },
    }),
    customSession(async ({ user, session }) => {
      return {
        user: {
          ...user,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          role: (user as any).role,
        },
        session,
      };
    }),
  ],
});

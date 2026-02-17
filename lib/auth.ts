import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { generateOTPTemplate } from "@/utils/EmailTemplate";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
  ],
});

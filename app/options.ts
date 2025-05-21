import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import logger from "./utils/logger";
import { maskMobileNumber } from "./(auth)/utils";
// import redisService from "./utils/redis/redis.service";

// import { signOut } from "@auth";
export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const REQ_URL = `/api/auth/[...nextauth]`;
        const decryptedPassword = CryptoJS.AES.decrypt(
          credentials?.password!!,
          process.env.NEXT_PUBLIC_SECRET!!
        ).toString(CryptoJS.enc.Utf8);

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/doLoginWithMobile`,
            {
              username: credentials?.username,
              password: decryptedPassword,
            }
          );
          if (!credentials?.username)
            throw new Error("Invalid credentials provided.");
          const maskedMobileNumber = maskMobileNumber(credentials?.username);
          if (res.data.status) {
            if (res.data.flag === "a") {
              const encryptedValue = CryptoJS.AES.encrypt(
                [credentials?.username, credentials?.password, "1"].join(":"),
                process.env.NEXT_PUBLIC_SECRET!!
              ).toString();
              // resume_signup_token
              cookies().set(
                `resume_signup_token${res.data.userType.toLowerCase()}`,
                encryptedValue,
                {
                  maxAge: 10 * 60,
                  // sameSite: "strict",
                  // path: "/",
                }
              );
              cookies().set("token", res.data.token, {
                maxAge: 365 * 24 * 60 * 60,
                secure: true,
                httpOnly: true,
                path: "/",
              });
              logger.info(
                `User ${maskedMobileNumber} OTP verified, proceeding to second step. Request: ${req.method} ${REQ_URL}`
              );
              throw new Error(res.data.userType);
            }
            cookies().set("token", res.data.token, {
              maxAge: 365 * 24 * 60 * 60,
              secure: true,
              httpOnly: true,
              path: "/",
            });
            // const redisKey = encode(
            //   `${res.data.mobile}`,
            //   process.env.NEXT_PUBLIC_SECRET!
            // );
            // 1. identity unique sesion there
            // 2. set unique session
            // 3. set unique session to a single number

            // if (!(await redisService.client.exists(`user_${redisKey}`))) {
            //   redisService.client.smembers(`user_${redisKey}`, "false");
            // }

            logger.info(
              `User ${maskedMobileNumber} logged in successfully. Request: ${req.method} ${REQ_URL}`
            );
            return {
              ...res.data,
            };
          } else {
            // console.log(res.data.identifer);
            switch (res.data.identifer) {
              case "NF":
                logger.error(
                  `User ${maskedMobileNumber} not found. Suggesting sign-up. Request: ${req.method} ${REQ_URL}`
                );
                throw new Error("We can't find user. Please Sign Up!");
              case "IU":
                logger.error(
                  `User ${maskedMobileNumber} under review. Request: ${req.method}`
                );
                throw new Error(
                  "User is under review. Please wait for Approval"
                );
              default:
                logger.error(
                  `Invalid credentials provided for user ${maskedMobileNumber}. Request: ${req.method} ${REQ_URL}`
                );
                throw new Error("Please enter correct password");
            }
          }
        } catch (error: any) {
          logger.error(
            `Error during authorization: ${error.message}. Request: ${req.method} ${REQ_URL}`
          );
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 365 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 365 * 24 * 60 * 60,
  },
  useSecureCookies: false,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};

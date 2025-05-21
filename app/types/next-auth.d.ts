/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userName: string;
      mobile: number;
      name: string;
      email: string;
      isActive: "Y" | "N";
      userType: "I" | "A" | "B";
      token: string;
    };
  }
}

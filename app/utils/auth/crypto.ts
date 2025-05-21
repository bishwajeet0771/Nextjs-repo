import CryptoJS from "crypto-js";
import { cookies } from "next/headers";

export async function decryptResumeSignupToken(slug: string) {
  const type = getType(slug);
  if (!type) return null;
  // Get the encrypted token from cookies
  const encryptedToken = await cookies().get("resume_signup_token" + type)
    ?.value;
  if (!encryptedToken) {
    return;
  }

  try {
    // Decrypt the token
    const decryptedToken = CryptoJS.AES.decrypt(
      encryptedToken as string, // Type assertion for compatibility
      process.env.NEXT_PUBLIC_SECRET!!
    ).toString(CryptoJS.enc.Utf8);

    // Split the decrypted token into components
    const [username, encryptedPassword, step, timestamp] =
      decryptedToken.split(":");

    // Decrypt the password
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      process.env.NEXT_PUBLIC_SECRET!!
    ).toString(CryptoJS.enc.Utf8);

    // Return the parsed and decrypted information
    return {
      username,
      password: decryptedPassword,
      step,
      timestamp: parseInt(timestamp, 10),
    };
  } catch (error) {
    return null;
    // throw new Error("Failed to decrypt signup token.");
  }
}

const getType = (slug: string) => {
  switch (slug) {
    case "agent":
      return "a";
    case "builder":
      return "b";
    default:
      break;
  }
};

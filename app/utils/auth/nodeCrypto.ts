import crypto from "crypto";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!; // Must be 32 bytes for AES-256
const IV_LENGTH = 16; // AES block size for initialization vector
if (!ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY must be a 32-byte string in .env file");
}

// Encryption function
const encryptData = (text?:string) => {
    if(!text) return null
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted; // Return iv and encrypted text
};

// Decryption function
const decryptData = (encryptedText:string) => {
    if(!encryptedText) return null
    const [iv, encrypted] = encryptedText.split(":");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return  JSON.parse(decrypted);
};

export { encryptData, decryptData };

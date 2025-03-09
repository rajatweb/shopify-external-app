import "dotenv/config";
import crypto from "crypto";

const algorithm = "aes-256-gcm";
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY || "", "hex"); // Ensure it's exactly 32 bytes
const ivLength = 16; // AES requires a 16-byte IV

export const encryptData = (data: any) => {
  if (!data) return "";

  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};

export const decryptData = (encryptedData: string) => {
  if (!encryptedData) return null;

  const [iv, authTag, encrypted] = encryptedData.split(":");
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTag, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
};

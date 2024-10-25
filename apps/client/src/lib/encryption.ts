import Cryptr from "cryptr";

function getSecretKey(): string {
    const secretKey = process.env.NEXTAUTH_SECRET;
    if (!secretKey) {
        throw new Error("NEXTAUTH_SECRET environment variable is not set.");
    }
    return secretKey;
}

export function encrypt(text: string): string {
    const cryptr = new Cryptr(getSecretKey());
    return cryptr.encrypt(text);
}

export function decrypt(encryptedString: string): string {
    const cryptr = new Cryptr(getSecretKey());
    return cryptr.decrypt(encryptedString);
}

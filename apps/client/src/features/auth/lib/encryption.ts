import Cryptr from "cryptr";

function getSecretKey(): string {
    const secretKey = process.env.SECRET || "XXy41eBU2gdmksLdx3ALY1eqdAvOf4nTXkAnx8jI";
    if (!secretKey) {
        throw new Error("SECRET environment variable is not set.");
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

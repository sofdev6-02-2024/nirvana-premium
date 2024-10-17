"use server"

import { RegisterSchema, RegisterValues } from "@/lib/validation";
import bcrypt from "bcrypt"

export const register = async (values: RegisterValues) => {
    const validateFields = RegisterSchema.safeParse(values);
    // existing user
    // password hash
    // verification token email

    

    if (!validateFields.success) {
        return { error: "Invalide fields!"}
    }
    return { success: "User Created"}
}
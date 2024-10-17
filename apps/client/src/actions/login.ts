"use server"

import { LoginSchema, LoginValues } from "@/lib/validation";

export const login = async (values: LoginValues) => {
    const validateFields = LoginSchema.safeParse(values);
    if (!validateFields.success) {
        return { error: "Invalide fields!"}
    }
    return { success: "Email sent"}
}
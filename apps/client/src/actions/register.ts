"use server"

import { RegisterSchema, RegisterValues } from "@/lib/validation";

export const register = async (values: RegisterValues) => {
    const validateFields = RegisterSchema.safeParse(values);
    
    if (!validateFields.success) {
        return { error: "Invalid fields!" }
    }
    
    try {
        const response = await fetch('http://localhost:9500/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            return { error: errorData.detail || "Registration failed" }; 
        }

        const data = await response.json();
        return { success: "User created successfully", userId: data.userId };

    } catch (error) {
        return { error: "Registration failed. Please try again." }
    }
}

"use server"

import { LoginSchema, LoginValues } from "@/lib/validation";

export const login = async (values: LoginValues) => {
    const validateFields = LoginSchema.safeParse(values);
    
    if (!validateFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const response = await fetch('http://localhost:9500/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            return { error: errorData.detail || "Login failed" }; 
        }

        return { success: "Logged in successfully" };

    } catch (error) {
        return { error: "Login failed. Please try again." };
    }
};

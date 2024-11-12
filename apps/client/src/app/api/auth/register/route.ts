// app/api/auth/register/route.ts
import { UserSignUpData } from "@/features/auth/lib/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userData: UserSignUpData = await req.json();

    // Server-side logging
    console.log("\n=== Server: New User Registration ===");
    console.log("Email:", userData.email);
    console.log("Role:", userData.role);
    console.log("Timestamp:", userData.createdAt);
    console.log("====================================\n");

    // Here you would normally send this data to your C# backend
    // const response = await fetch('YOUR_C#_BACKEND_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });

    return NextResponse.json({
      success: true,
      message: "User registration logged successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log registration" },
      { status: 500 },
    );
  }
}

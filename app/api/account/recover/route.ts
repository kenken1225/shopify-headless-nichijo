import { NextRequest, NextResponse } from "next/server";
import { recoverCustomerPassword } from "@/lib/shopify/customer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await recoverCustomerPassword(email);

    // Even if there are errors, return success for security reasons
    // (to prevent leaking whether the email is registered or not)
    if (result.customerUserErrors.length > 0) {
      console.log("Password recovery errors:", result.customerUserErrors);
    }

    return NextResponse.json({
      success: true,
      message:
        "If an account exists for this email, you will receive an email with instructions to reset your password",
    });
  } catch (error) {
    console.error("Password recovery error:", error);
    return NextResponse.json({ error: "Password reset processing error" }, { status: 500 });
  }
}

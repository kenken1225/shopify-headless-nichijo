import { AccountPageLayout } from "@/components/account/AccountPageLayout";
import { ForgotPasswordForm } from "@/components/account/ForgotPasswordForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reset Password | Nichijo",
  description: "Reset your Nichijo account password",
};

export default async function ForgotPasswordPage() {
  // If already logged in, redirect to My Page
  const cookieStore = await cookies();
  const token = cookieStore.get("customerAccessToken")?.value;

  if (token) {
    redirect("/account");
  }

  return (
    <AccountPageLayout
      title="Reset Your Password"
      description="Enter your email address and we'll send you a link to reset your password."
      breadcrumbs={[{ label: "Login", href: "/account/login" }, { label: "Reset Password" }]}
    >
      <ForgotPasswordForm />
    </AccountPageLayout>
  );
}

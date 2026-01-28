import { AccountPageLayout } from "@/components/account/AccountPageLayout";
import { LoginForm } from "@/components/account/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login | Nichijo",
  description: "Log in to your Nichijo account",
};

export default async function LoginPage() {
  // If already logged in, redirect to My Page
  const cookieStore = await cookies();
  const token = cookieStore.get("customerAccessToken")?.value;

  if (token) {
    redirect("/account");
  }

  return (
    <AccountPageLayout title="Login" breadcrumbs={[{ label: "Login" }]}>
      <LoginForm />
    </AccountPageLayout>
  );
}

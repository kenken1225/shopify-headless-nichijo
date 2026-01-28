import { AccountPageLayout } from "@/components/account/AccountPageLayout";
import { AccountDashboard } from "@/components/account/AccountDashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Account | Nichijo",
  description: "Manage your Nichijo account",
};

export default async function AccountPage() {
  // If not logged in, redirect to Login Page
  const cookieStore = await cookies();
  const token = cookieStore.get("customerAccessToken")?.value;

  if (!token) {
    redirect("/account/login");
  }

  return (
    <AccountPageLayout title="My Account" breadcrumbs={[{ label: "Account" }]} maxWidth="md">
      <AccountDashboard />
    </AccountPageLayout>
  );
}

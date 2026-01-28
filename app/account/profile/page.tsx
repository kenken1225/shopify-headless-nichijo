import { AccountPageLayout } from "@/components/account/AccountPageLayout";
import { ProfileForm } from "@/components/account/ProfileForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile | Nichijo",
  description: "Edit your profile information",
};

export default async function ProfilePage() {
  // If not logged in, redirect to Login Page
  const cookieStore = await cookies();
  const token = cookieStore.get("customerAccessToken")?.value;

  if (!token) {
    redirect("/account/login");
  }

  return (
    <AccountPageLayout title="My Profile" breadcrumbs={[{ label: "Account", href: "/account" }, { label: "Profile" }]}>
      <ProfileForm />
    </AccountPageLayout>
  );
}

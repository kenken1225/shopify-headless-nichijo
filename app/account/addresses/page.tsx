import { AccountPageLayout } from "@/components/account/AccountPageLayout";
import { AddressManager } from "@/components/account/AddressManager";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Addresses | Nichijo",
  description: "Manage your shipping addresses",
};

export default async function AddressesPage() {
  // If not logged in, redirect to Login Page
  const cookieStore = await cookies();
  const token = cookieStore.get("customerAccessToken")?.value;

  if (!token) {
    redirect("/account/login");
  }

  return (
    <AccountPageLayout
      title="My Addresses"
      breadcrumbs={[{ label: "Account", href: "/account" }, { label: "Addresses" }]}
      maxWidth="lg"
    >
      <AddressManager />
    </AccountPageLayout>
  );
}

import { AccountPageLayout } from "@/components/account/AccountPageLayout";
import { ResetPasswordForm } from "@/components/account/ResetPasswordForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create New Password | Nichijo",
  description: "Create a new password for your Nichijo account",
};

type PageProps = {
  searchParams: Promise<{
    reset_url?: string;
  }>;
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { reset_url } = await searchParams;

  if (!reset_url) {
    redirect("/account/login");
  }

  return (
    <AccountPageLayout
      title="Create New Password"
      description="Please enter your new password below."
      breadcrumbs={[{ label: "Login", href: "/account/login" }, { label: "Create New Password" }]}
    >
      <ResetPasswordForm resetUrl={reset_url} />
    </AccountPageLayout>
  );
}

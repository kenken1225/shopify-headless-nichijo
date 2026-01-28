import { AccountPageLayout } from "@/components/account/AccountPageLayout";
import { ResetPasswordForm } from "@/components/account/ResetPasswordForm";

export const metadata = {
  title: "Create New Password | Nichijo",
  description: "Create a new password for your Nichijo account",
};

type PageProps = {
  params: Promise<{
    customerId: string;
    token: string;
  }>;
};

export default async function ResetPasswordPage({ params }: PageProps) {
  const { customerId, token } = await params;

  return (
    <AccountPageLayout
      title="Create New Password"
      description="Please enter your new password below."
      breadcrumbs={[
        { label: "Login", href: "/account/login" },
        { label: "Create New Password" },
      ]}
    >
      <ResetPasswordForm customerId={customerId} resetToken={token} />
    </AccountPageLayout>
  );
}

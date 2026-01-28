"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FormInput } from "./FormInput";
import { SubmitButton } from "./SubmitButton";

type ResetPasswordFormProps = {
  customerId: string;
  resetToken: string;
};

export function ResetPasswordForm({ customerId, resetToken }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/account/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          resetToken,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password");
        return;
      }

      setSuccess(true);

      // After 3 seconds, redirect to My Page
      setTimeout(() => {
        router.push("/account");
        router.refresh();
      }, 3000);
    } catch (err) {
      console.error("Password reset error:", err);
      setError("An error occurred while resetting your password");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-6">
        <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm">
          Your password has been successfully reset!
        </div>
        <p className="text-sm text-muted-foreground">You will be redirected to your account page in a few seconds...</p>
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm text-foreground font-medium hover:underline"
        >
          Go to My Account
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <div className="space-y-2">
        <FormInput
          label="New password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          minLength={8}
        />
        <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
      </div>

      <FormInput
        label="Confirm new password"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
        minLength={8}
      />

      <SubmitButton loading={loading}>Reset Password</SubmitButton>

      <div className="text-center">
        <Link
          href="/account/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </form>
  );
}

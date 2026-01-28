"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormInput } from "./FormInput";
import { FormCheckbox } from "./FormCheckbox";
import { SubmitButton } from "./SubmitButton";

export function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    acceptsMarketing: false,
    acceptsPrivacyPolicy: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.acceptsPrivacyPolicy) {
      setError("Please agree to the Privacy Policy to continue");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          password: formData.password,
          acceptsMarketing: formData.acceptsMarketing,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // After successful registration, redirect to My Page
      router.push("/account");
      router.refresh();
    } catch (err) {
      console.error("Register error:", err);
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <FormInput
        label="First name"
        name="firstName"
        type="text"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        required
        autoComplete="given-name"
      />

      <FormInput
        label="Last name"
        name="lastName"
        type="text"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        required
        autoComplete="family-name"
      />

      <FormInput
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />

      <FormInput
        label="Phone number"
        name="phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        value={formData.phone}
        onChange={handleChange}
        optional
        autoComplete="tel"
      />

      <div className="space-y-2">
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
          minLength={8}
        />
        <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
      </div>

      <div className="space-y-4 pt-2">
        <FormCheckbox
          name="acceptsMarketing"
          checked={formData.acceptsMarketing}
          onChange={handleChange}
          label="Subscribe to marketing emails for exclusive offers and updates"
        />

        <FormCheckbox
          name="acceptsPrivacyPolicy"
          checked={formData.acceptsPrivacyPolicy}
          onChange={handleChange}
          label={
            <>
              I agree to the{" "}
              <Link href="/policies/privacy-policy" className="text-primary hover:underline" target="_blank">
                Privacy Policy
              </Link>{" "}
              <span className="text-destructive">*</span>
            </>
          }
        />
      </div>

      <SubmitButton loading={loading}>Create Account</SubmitButton>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/account/login" className="text-foreground font-medium hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

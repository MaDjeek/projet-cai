"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/providers/AuthProvider";
import SignupForm from "@/components/SignupForm";
import { useAuth } from "@/hooks/useAuth";

const SignupContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <p>Redirection en cours...</p>;
  }

  return <SignupForm onCancel={() => router.push("/")} />;
};

function SignupPage() {
  return (
    <SignupContent />
  );
}

export default SignupPage;
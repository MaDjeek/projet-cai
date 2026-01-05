"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/providers/AuthProvider";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";

const LoginContent: React.FC = () => {
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

  return <LoginForm onCancel={() => router.push("/")} />;
};

function LoginPage() {
  return (
    <LoginContent />
  );
}

export default LoginPage;
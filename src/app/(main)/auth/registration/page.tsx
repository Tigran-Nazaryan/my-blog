"use client";

import { useEffect } from "react";
import { useAuth } from "@/store/store";
import { Spin } from "antd";
import RegistrationForm from "@/components/ui/SignUpForm";
import Dashboard from "@/app/(main)/dashboard/page";

export default function Registration() {
  const { checkAuth, isAuth, isLoading } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, [checkAuth]);

  if (isLoading) {
    return <Spin />;
  }

  if (isAuth) {
    return <Dashboard />;
  }

  return (
    <div>
      <RegistrationForm />
    </div>
  );
}
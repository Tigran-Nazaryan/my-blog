"use client";

import {useEffect} from "react";
import {useAuth} from "@/store/store";
import {Spin} from "antd";
import RegistrationForm from "@/components/ui/SignUpForm";

export default function Registration() {
  const {checkAuth, isLoading} = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  if (isLoading) {
    return <Spin/>;
  }

  return (
    <div>
      <RegistrationForm/>
    </div>
  );
}
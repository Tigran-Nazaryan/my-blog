"use client";

import LoginForm from "@/components/ui/LoginForm";
import { useEffect } from "react";
import { useAuth } from "@/store/store";
import { Spin } from "antd";

export default function Login() {
  const { checkAuth, isAuth, isLoading } = useAuth()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth()
    }
  }, [])

  if (isLoading) {
    return <Spin/>
  }

  if (!isAuth) {
    return (
      <>
        <div>
          <LoginForm/>
        </div>
      </>
    )
  }

  return (
    <></>
  )
}
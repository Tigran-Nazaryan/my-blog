"use client";

import LoginForm from "@/components/ui/LoginForm";
import {useEffect} from "react";
import {useAuth} from "@/store/store";
import {Button, Spin} from "antd";

export default function Login() {
  const {checkAuth, isAuth, logout, isLoading} = useAuth()

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
    <div>
      <h1>{isAuth ? `user auth` : ""}</h1>
      <Button onClick={() => logout()}>logout</Button>
    </div>
  )
}
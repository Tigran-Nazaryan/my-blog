"use client";

import React from "react";
import {Form, Input, Button, Card} from "antd";
import {toast} from "react-toastify";
import {useAuth} from "@/store/store";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {login} = useAuth();

  const handleLogin = async (values: FormValues) => {
    try {
      await login(values.email, values.password);
      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Card title="Login" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{required: true, type: "email", message: "Please enter a valid email"}]}
          >
            <Input placeholder="Enter your email"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: "Enter your password"}]}
          >
            <Input.Password placeholder="Enter your password"/>
          </Form.Item>

          <a href="/auht/registration"></a>

          <Form.Item>
            <div style={{textAlign: "center", marginBottom: "1rem"}}>
              Don't have an account?{" "}
              <Link href="/auth/registration">
                Register here
              </Link>
            </div>

            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

        </Form>
    </Card>
  );
};

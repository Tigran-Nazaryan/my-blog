"use client";

import React from "react";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useAuth } from "@/store/store";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();

  const handleLogin = async (values: FormValues) => {
    console.log("Submitting login form:", values);
    try {
      await login(values.email, values.password);
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleLogin}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Enter your password" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

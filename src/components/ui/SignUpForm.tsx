import {toast} from "react-toastify";
import {useAuth} from "@/store/store";
import {Button, Form, Input} from "antd";
import {useRouter} from "next/navigation";

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function RegistrationForm() {
  const { registration } = useAuth();
  const router = useRouter()

  const handleRegister = async (values: FormValues) => {
    try {
      await registration(values.email, values.password, values.firstName, values.lastName);
      toast.success("Registration successful");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleRegister}>
      <Form.Item
        label="firstName"
        name="firstName"
        rules={[{ required: true, message: "Enter your firstName" }]}
      >
        <Input placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        label="lastName"
        name="lastName"
        rules={[{ required: true, message: "Enter your lastName" }]}
      >
        <Input placeholder="Enter your lastName" />
      </Form.Item>

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
        <Button type="default" htmlType="submit" block>
          Registration
        </Button>
      </Form.Item>
    </Form>
  );
};

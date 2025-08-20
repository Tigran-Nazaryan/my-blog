"use client";

import { Button } from "antd";
import {useAuth} from "@/store/store";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button type="primary" onClick={logout}>
      Logout
    </Button>
  );
}

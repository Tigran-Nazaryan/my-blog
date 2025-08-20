'use client';

import { Layout } from 'antd';
import AppMenu from "@/components/common/layout/menu";
import LogoutButton from "@/components/ui/LogoutBtn";
import {useAuth} from "@/store/store";

const { Header } = Layout;

export default function AppHeader() {
  const { isAuth } = useAuth()
  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <AppMenu/>
      { isAuth ? (<LogoutButton/>) : "" }
    </Header>
  );
}

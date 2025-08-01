'use client';

import { Layout, Menu } from 'antd';
import AppMenu from "@/components/common/layout/menu";

const { Header } = Layout;

export default function AppHeader() {
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <AppMenu />
        </Header>
    );
}

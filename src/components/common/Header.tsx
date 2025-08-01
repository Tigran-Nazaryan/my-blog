'use client';

import { Layout } from 'antd';
import AppMenu from "@/components/common/layout/menu";

const { Header } = Layout;

export default function AppHeader() {
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <AppMenu />
        </Header>
    );
}

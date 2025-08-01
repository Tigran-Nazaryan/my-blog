'use client';

import { Layout } from 'antd';
import AppHeader from './Header';
import * as React from "react";

const { Content } = Layout;

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
                {children}
            </Content>
        </Layout>
    );
}

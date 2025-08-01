'use client';

import { Layout, Menu, Typography } from 'antd';
import Link from 'next/link';

const { Header } = Layout;

export default function AppHeader() {
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
                <Typography.Title level={4} style={{ color: 'white'}}>
                    My Blog
                </Typography.Title>

            <Menu
                defaultSelectedKeys={['blog']}
                items={[{ key: 'blog', label: <Link href="/blog">posts</Link> }]}
            />
        </Header>
    );
}

'use client';

import {Layout} from 'antd';
import AppHeader from '../Header';
import * as React from "react";
import "../layout/style/layout.css"

const {Content} = Layout;

export default function LayoutWrapper({children}: { children: React.ReactNode }) {
    return (
        <Layout className="app-layout">
            <AppHeader/>
            <Content className="app-content">
                {children}
            </Content>
        </Layout>
    );
}

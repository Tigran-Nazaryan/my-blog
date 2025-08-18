import React, {FC} from 'react';
import {Menu} from 'antd';
import Link from 'next/link';
import {menuItems} from './menuConfig';
import type {MenuItem} from './types';
import "../menu/style/menuStyle.css"

const AppMenu: FC = () => {
  const items = menuItems.map((item: MenuItem) => ({
    key: item.key,
    label: <Link className="menu-link" href={item.href}>{item.label}</Link>,
    disabled: item.disabled,
  }));

  return (
    <Menu
      defaultSelectedKeys={['posts']}
      items={items}
      theme="dark"
      style={{ display: "flex", gap: "1rem" }}
    />
  );
};

export default AppMenu;

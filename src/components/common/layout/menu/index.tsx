import React, { FC } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import {menuItems} from './menuConfig';
import type { MenuItem } from './types';
import "../menu/style/menuStyle.css"
import { usePathname } from "next/navigation";

const AppMenu: FC = () => {
  const pathname = usePathname();

  const selectedKey = menuItems.find((item) => item.href === pathname)?.key;

  const items = menuItems.map((item: MenuItem) => ({
    key: item.key,
    label: <Link className="menu-link" href={item.href}>{item.label}</Link>,
    disabled: item.disabled,
  }));

  return (
    <Menu
      items={items}
      theme="dark"
      style={{ display: "flex", gap: "1rem" }}
      mode="horizontal"
      selectedKeys={selectedKey ? [selectedKey] : []}
    />
  );
};

export default AppMenu;

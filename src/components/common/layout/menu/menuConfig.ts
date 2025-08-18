import { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  {
    key: 'posts',
    label: 'Posts',
    href: '/',
  },
  {
    key: 'login',
    label: 'Login',
    href: '/auth/login',
  },
  {
    key: 'register',
    label: 'Register',
    href: '/auth/registration',
  },
];

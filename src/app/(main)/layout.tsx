import * as React from "react";
import LayoutWrapper from "@/components/common/layout/layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout({children}: { children: React.ReactNode }) {
  return (
    <LayoutWrapper>{children}
      <ToastContainer position="top-right" autoClose={3000}/>
    </LayoutWrapper>
  )
}

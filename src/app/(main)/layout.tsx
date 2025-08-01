import * as React from "react";
import LayoutWrapper from "@/components/common/layout";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <LayoutWrapper>{children}</LayoutWrapper>;
}

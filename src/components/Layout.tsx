import styled from "styled-components";
import { Sidebar } from "./Global/Sidebar";
import { windowWidth } from "@/utils/windowWidth";
import { HeaderComponent } from "./Global/Header";
import { loginVerifyAPI } from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface LayoutProps {
  fadeOut: any;
}

const RootLayout = ({
  children,
  fadeOut,
}: {
  children: React.ReactNode;
  fadeOut: LayoutProps["fadeOut"];
}) => {
  const router = useRouter();
  async function handleVerify() {
    const connect = await loginVerifyAPI();
    if (connect !== 200) {
      return router.push("/login");
    }
    return;
  }

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <>
      <div className="flex flex-col bg-black overflow-hidden min-h-screen lg:flex-row">
        <Sidebar fadeOut={() => fadeOut()} />
        <HeaderComponent fadeOut={() => fadeOut()} />
        {children}
      </div>
    </>
  );
};

export default RootLayout;

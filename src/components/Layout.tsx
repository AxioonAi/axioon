import styled from "styled-components";
import { Sidebar } from "./Global/Sidebar";
import { windowWidth } from "@/utils/windowWidth";
import { HeaderComponent } from "./Global/Header";

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

const Container = styled.div`
  display: flex;
  background-color: #000;
  overflow: hidden;
  min-height: 100vh;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  page: string;
};

const Layout = ({ page, children }: LayoutProps) => {
  return (
    <>
      <Header page={page} />
      <section className="px-5 flex items-center justify-center md:px-10">{children}</section>
      <Footer />
    </>
  );
};

export default Layout;

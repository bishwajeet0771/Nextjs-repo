import Footer from "@/app/components/layouts/primary/footer";
import Header from "@/app/components/layouts/primary/header";
import "@mantine/carousel/styles.css";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

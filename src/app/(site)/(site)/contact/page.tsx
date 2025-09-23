
import React from "react";
import { Metadata } from "next";
import HeroSub from "@/app/(site)/components/shared/hero-sub";
import ContactInfo from "@/app/(site)/components/contact/contact-info";
import ContactForm from "@/app/(site)/components/contact/form";
import Location from "@/app/(site)/components/contact/office-location";
export const metadata: Metadata = {
  title: "Contact | RKPM",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <HeroSub
        title="Contact Us"
        description="Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      <ContactForm />
      <Location />
    </>
  );
};

export default page;

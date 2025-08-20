import Signin from "@/app/(site)/components/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign In | Property-pro",
};

const SigninPage = () => {
  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;

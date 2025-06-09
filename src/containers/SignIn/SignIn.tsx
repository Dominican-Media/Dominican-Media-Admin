"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Logo from "@/components/Logo/Logo";
import { AuthUserContext } from "@/context/AuthUserContext";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { requestType } from "@/utilities/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import classes from "./SignIn.module.css";

const SignIn = () => {
  // States
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    error: null,
    data: null,
  });

  // Context
  const { setUser } = useContext(AuthUserContext);

  // Router
  const router = useRouter();

  // Hooks
  const { errorFlowFunction } = useError();

  // Requests
  const handleSignIn = () => {
    requestHandler({
      url: "/auth/sign-in",
      method: "POST",
      data: signInData,
      state: requestState,
      setState: setRequestState,
      id: "sign-in",
      requestCleanup: true,
      successFunction(res) {
        if (typeof window !== "undefined") {
          window?.localStorage.setItem(
            LOCAL_STORAGE_AUTH_KEY,
            res?.data?.token
          );
        }
        setUser(res?.data?.user);
        router.push(routes.DASHBOARD);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  return (
    <section className={classes.container}>
      <Logo />

      <h4>Welcome back</h4>

      <form>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={signInData?.email}
          onChange={(e) => inputChangeHandler(e, setSignInData)}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={signInData?.password}
          onChange={(e) => inputChangeHandler(e, setSignInData)}
          tip="Password should be of length greater than 8 characters"
        />
        <Button
          disabled={
            !signInData?.email ||
            !signInData?.password ||
            signInData?.password?.length < 8
          }
          onClick={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          loading={requestState?.isLoading}
        >
          Log in
        </Button>
      </form>
      <Link href="#">Forgot Password?</Link>
    </section>
  );
};

export default SignIn;

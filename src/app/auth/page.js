"use client";
import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function AuthPage() {
  const auth = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, [auth]);

  const toggleScreen = () => setIsLoginScreen(!isLoginScreen);

  if (auth) {
    return <p>you can't access this page when login</p>;
  }
  if (!auth) {
    return (
      <main>
        {isLoginScreen ? (
          <Login toggleScreen={toggleScreen} />
        ) : (
          <Register toggleScreen={toggleScreen} />
        )}
      </main>
    );
  }
}

export default AuthPage;

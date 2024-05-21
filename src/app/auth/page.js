"use client";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";


function AuthPage() {
  

  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const toggleScreen = () => setIsLoginScreen(!isLoginScreen);

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

export default AuthPage;


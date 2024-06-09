"use client";
import { useRouter } from "next/navigation";


function Page() {
  const router = useRouter();

    return (
      <main className="w-9/12 mx-auto text-center my-8">
        <h2 className="text-noto">Oops! You need to be logged in to access this page.</h2>
        <p className="mt-8">Please log in to your account to continue. If you don't have an account, you can sign up in just a few minutes.</p>
        <button className="button bg-orange-400 text-white mb-32" onClick={()=>router.push("/auth")}>SignIn/SignUp</button>
      </main>
    );
  }

export default Page;

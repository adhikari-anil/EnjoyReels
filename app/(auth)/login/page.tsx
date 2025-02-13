"use client";

import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function login() {
  const session = useSession();
  const handleSignIn = async (app: string) => {
    await signIn(app, {callbackUrl: "http://localhost:3000"});
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-10 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r text-center from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Login</h1>
        <p>Welcome back</p>
        <form>
          <div className="mt-4 flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="p-2 h-14 border-2 border-solid border-[#000] rounded-lg"
              name="email"
              type="email"
              placeholder="Enter Your Email..."
            />
          </div>
          <div className="mt-4 p-2 flex flex-col gap-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="p-2 h-14 border-2 border-solid border-[#000] rounded-lg"
              name="password"
              type="password"
              placeholder="Enter Your Password..."
            />
          </div>
          <div className="mt-4 text-center font-bold">
            <Link href={"forget-password"}>Forget Password ?</Link>
          </div>
          <div className="mt-4 p-2 border-2 border-solid border-[#000] rounded-lg">
            <button className="w-full">Submit</button>
          </div>
          <div className="flex justify-center mt-5 gap-2 cursor-pointer">
            <img
              src="https://avatars.slack-edge.com/2020-11-25/1527503386626_319578f21381f9641cd8_512.png"
              alt=""
              className="rounded-full w-10 h-10"
              onClick={() => handleSignIn("github")}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
              alt=""
              className="rounded-full w-10 h-10"
              onClick={() => handleSignIn("google")}
            />
          </div>
        </form>
        <p className="text-center mt-2">
          Don't have any account ?{" "}
          <strong>
            <Link href={"/register"}>Register</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}

export default login;

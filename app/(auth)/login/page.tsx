"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface propsForSignIn {
  provider: "github" | "google" | "credentials";
  email?: string;
  password?: string;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (data: propsForSignIn) => {
    if(data.provider==="credentials" && (!data.email || !data.password)){
      setError("Please insert your Email and Password!");
      return;
    }
    await signIn(data.provider, {
      ...(data.email && { email: data.email }),
      ...(data.password && { password: data.password }),
      callbackUrl: "http://localhost:3000",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleSignIn({
        provider: "credentials",
        email: email,
        password: password,
      });
    } catch (error) {
      console.log("Error in LogIn!..",error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-10 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r text-center from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Login</h1>
        <p>Welcome back</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="p-2 h-14 border-2 border-solid border-[#000] rounded-lg"
              name="email"
              type="email"
              placeholder="Enter Your Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-red-500">{error}</p>
          </div>
          <div className="mt-4 p-2 flex flex-col gap-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="p-2 h-14 border-2 border-solid border-[#000] rounded-lg"
              name="password"
              type="password"
              placeholder="Enter Your Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-500">{error}</p>
          </div>
          <div className="mt-4 text-center font-bold">
            <Link href={"forget-password"}>Forget Password ?</Link>
          </div>
          <div className="mt-4 p-2 border-2 border-solid border-[#000] rounded-lg">
            <button className="w-full">Submit</button>
          </div>
          <div className="flex justify-center mt-5 gap-2 cursor-pointer">
            <Image
              src="https://avatars.slack-edge.com/2020-11-25/1527503386626_319578f21381f9641cd8_512.png"
              alt=""
              width={20}
              height={20}
              className="rounded-full w-10 h-10"
              onClick={() => handleSignIn({ provider: "github" })}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
              alt=""
              width={20}
              height={20}
              className="rounded-full w-10 h-10"
              onClick={() => handleSignIn({ provider: "google" })}
            />
          </div>
        </form>
        <p className="text-center mt-2">
          Donot have any account ?{" "}
          <strong>
            <Link href={"/register"}>Register</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}

export default Login;

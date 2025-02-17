"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const signUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpassword, setConformPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== conformpassword) {
      setError("Please conform for password! ");
    }
    try {
      const result = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = result.json();
      if (!result.ok) {
        setError("Registration Failed! ");
      }
      router.push("/login");
    } catch (error) {
      console.log("Registration Error: ", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-10 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r text-center from-pink-400 to-purple-500 text-transparent bg-clip-text">
          ENJOYREELS.COM
        </h1>
        <h1 className="text-3xl font-bold">Signup</h1>
        <p> Register and Enjoy our Service </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="p-2 h-14 border-2 border-solid border-[#000] rounded-lg"
              name="email"
              type="email"
              placeholder="Enter Your Email..."
              onChange={(e)=>setEmail(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 p-2 flex flex-col gap-4">
            <label htmlFor="password">Conform Password</label>
            <input
              id="conformpassword"
              className="p-2 h-14 border-2 border-solid border-[#000] rounded-lg"
              name="conformpassword"
              type="conformpassword"
              placeholder="Enter Your Password Again..."
              onChange={(e)=>setConformPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 p-2 border-2 border-solid border-[#000] rounded-lg">
            <button className="w-full" type="submit">Submit</button>
          </div>
        </form>
        <p className="text-center mt-2">
          Already have any account ?{" "}
          <strong>
            <Link href={"/login"}>LogIn</Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default signUp;

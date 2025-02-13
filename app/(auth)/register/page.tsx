import Link from "next/link";
import React from "react";

const signUp = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-10 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r text-center from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Signup</h1>
        <p> Register and Enjoy our Service </p>
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
          <div className="mt-4 p-2 border-2 border-solid border-[#000] rounded-lg">
            <button className="w-full">Submit</button>
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

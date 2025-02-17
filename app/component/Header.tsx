"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Lobster_Two } from "next/font/google";

const lobsterTwo = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

function Header() {
  const { data: session } = useSession();

  return (
    <div className="p-2 flex justify-between z-10 bg-cyan-500">
      <div className="p-2">
        <h1 className={`${lobsterTwo.className} text-2xl`}>EnjoyReel.Com</h1>
      </div>
      {session ? (
        <div className="flex gap-4 justify-center items-center ml-4">
          <p className={`${lobsterTwo.className}`}>
            Signed in as {session.user?.email}
          </p>
          <button
            className={`${lobsterTwo.className} p-2 bg-slate-200 border-2 rounded-lg`}
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          className={`${lobsterTwo.className} p-2 border-2 rounded-lg`}
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </div>
  );
}

export default Header;

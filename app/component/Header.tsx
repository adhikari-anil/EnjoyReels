"use client";

import { PlusCircleIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Lobster_Two } from "next/font/google";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";

const lobsterTwo = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleUploadClick = () => {
    router.push("/upload");
  };

  return (
    <div className="p-2 flex justify-between bg-cyan-500">
      <div className="p-2">
        <h1 className={`${lobsterTwo.className} text-2xl`}>EnjoyReel.Com</h1>
      </div>
      {session ? (
        <div className="flex gap-4 justify-center items-center ml-4">
          <button
            data-tooltip-id="my-tooltip"
            className={`${lobsterTwo.className} p-2 hover:`}
            onClick={handleUploadClick}
          >
            <PlusCircleIcon />
          </button>
          <Tooltip id="my-tooltip" place="top">
            Upload
          </Tooltip>
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

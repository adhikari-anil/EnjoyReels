"use client";

import { PlusCircleIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Lobster_Two } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

const lobsterTwo = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

function Header() {
  const { data: session } = useSession();
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleUploadClick = () => {
    setClicked((prev) => !prev);
  };

  const handleUploadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setClicked(false);
    router.push(`/upload?type=${selectedValue}`); // Pass type as query param
  };

  return (
    <div className="p-2 flex justify-between bg-cyan-500 items-center">
      {/* Logo */}
      <h1 className={`${lobsterTwo.className} text-2xl p-2`}>EnjoyReel.Com</h1>

      {session ? (
        <div className="flex gap-4 items-center">
          {/* Upload Button with Tooltip */}
          <div className="relative">
            <button
              data-tooltip-id="upload-tooltip"
              className="p-2 hover:cursor-pointer"
              onClick={handleUploadClick}
            >
              <PlusCircleIcon size={28} />
            </button>
            <Tooltip id="upload-tooltip" place="top">
              Upload
            </Tooltip>

            {/* Upload Options */}
            {clicked && (
              <select
                className="absolute left-0 top-10 bg-white border rounded-lg shadow-md p-2"
                onChange={handleUploadChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="image">Upload Image</option>
                <option value="video">Upload Video</option>
              </select>
            )}
          </div>

          {/* User Info */}
          <p className={`${lobsterTwo.className}`}>
            Signed in as {session.user?.email}
          </p>

          {/* Sign Out Button */}
          <button
            className="p-2 bg-slate-200 border-2 rounded-lg"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <button className="p-2 border-2 rounded-lg" onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </div>
  );
}

export default Header;
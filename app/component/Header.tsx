"use client";

import { ImagePlus, SquarePlay } from "lucide-react";
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
    router.push("/uploadimage");
  };

  const handleVideoUploadClick = () => {
    router.push("/uploadvideos");
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
              data-tooltip-id="upload-imagetip"
              className="p-2 hover:cursor-pointer"
              onClick={handleUploadClick}
            >
              <ImagePlus size={28} />
            </button>
            <Tooltip id="upload-imagetip" place="top">
              Upload image
            </Tooltip>
            <button
              data-tooltip-id="upload-videotip"
              className="p-2 hover:cursor-pointer"
              onClick={handleVideoUploadClick}
            >
              <SquarePlay size={28} />
            </button>
            <Tooltip id="upload-videotip" place="top">
              Upload video
            </Tooltip>
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

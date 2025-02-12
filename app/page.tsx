"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function page() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="flex flex-col gap-2 justify-center h-1/2 w-1/2">
            <p className="text-center">
              Signed in as {session.user?.name} with {session.user?.email}
            </p>
            <div className="flex justify-center items-center">
              <Image
                src={session.user?.image!}
                alt="Your PP"
                height={200}
                width={200}
                priority={false}
              />
            </div>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
}

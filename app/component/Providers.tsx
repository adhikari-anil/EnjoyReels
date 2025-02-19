"use client";
import { ImageKitProvider } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_KEY;

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/imagekit_auth"
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.log("FE: Authentication failed => ", error);
      throw new Error(`Authentication request failed: ${error}`);
    }
  };
  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
  );
}

"use client";
import { IKImage } from "imagekitio-next";
import FileUpload from "./component/FileUpload";
import Header from "./component/Header";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function page() {
  return (
    <div className="p-5">
      <Header />
      <div className="mt-10">
        <FileUpload
          onSuccess={(res) => {
            console.log("File uploaded successfully:", res);
            // You can handle success here, such as storing the uploaded file URL
          }}
          onProgress={(progress) => {
            console.log("Upload progress:", progress, "%");
            // You can handle upload progress here
          }}
          fileType="image" // You can switch to "video" if uploading videos
        />
      </div>
      <IKImage
        urlEndpoint={urlEndpoint}
        path="default-image.jpg"
        width={400}
        height={400}
        alt="Alt text"
      />
    </div>
  );
}

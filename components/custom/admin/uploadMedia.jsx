"use client";
import { toastify } from "@/lib/toastify";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { FaUpload } from "react-icons/fa6";

const UploadMedia = ({ queryClient, isMultiple, userID }) => {
  const onError = async (error) => {
    toastify("error", error.statusText);
  };
  const onQueuesEnd = async (results) => {
    const files = results.info.files;
    const uploadedFiles = files
      .filter((file) => file.uploadInfo)
      .map((file) => ({
        asset_id: file.uploadInfo.asset_id,
        public_id: file.uploadInfo.public_id,
        path: file.uploadInfo.path,
        secure_url: file.uploadInfo.secure_url,
        thumbnail_url: file.uploadInfo.thumbnail_url,
      }));
    if (uploadedFiles.length > 0) {
      try {
        const { data: uploadMediaResponse } = await axios.post(
          "/api/media/create",
          uploadedFiles
        );
        if (!uploadMediaResponse.success) {
          throw new Error(uploadMediaResponse.message);
        }
        queryClient.invalidateQueries(["media-data"]);
        toastify("success", uploadMediaResponse.message);
      } catch (error) {
        toastify("error", error.message);
      }
    }
  };
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      config={{
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
      }}
      options={{
        multiple: isMultiple,
        folder: `hattah/${userID}/media`,
        sources: ["local", "url", "dropbox", "google_drive", "unsplash"],
      }}
      onError={onError}
      onQueuesEnd={onQueuesEnd}
    >
      {({ open }) => {
        return (
          <Button
            className="cursor-pointer"
            type="button"
            onClick={() => open()}
          >
            <FaUpload />
            Upload
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadMedia;

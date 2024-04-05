"use client";

import React from "react";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

type FileUploadProps = {
    onChange: (url?: string) => void;
    endPoint: keyof typeof ourFileRouter;
};

const FileUpload = ({ onChange, endPoint }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endPoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
        />
    );
};

export default FileUpload;

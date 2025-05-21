"use client";
import "@mantine/dropzone/styles.css";
import { mediaCloudIcon } from "@/app/images/commonSvgs";
import { Button, Image, Modal, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import S from "@/app/styles/Share.module.css";
// interface DropZoneProps extends Partial<any> {
//   onLogoSelect: (logo: File) => void;
//   logo?: File;
// }
const IMAGE_MIME_TYPE = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
export function DropZone(props: Partial<any>) {
  const [error, setError] = useState("");
  return (
    <div className="mb-10">
      <Text fw={500} mt={"md"}>
        Upload Logo
      </Text>
      {props.logo ? (
        <Preview
          main={props.onLogoSelect}
          logo={props.logo}
          setError={setError}
        />
      ) : (
        <Dropzone
          multiple={false}
          title="Upload LOGO"
          onDrop={(files) => {
            const logoFile = files[0];
            props.onLogoSelect && props.onLogoSelect(logoFile);
            setError("");
          }}
          // eslint-disable-next-line no-unused-vars
          onReject={(files) =>
            setError("File size must not exceed more than 10 MB")
          }
          maxSize={10 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          {...props}
        >
          {/* <Dropzone.Accept>{mediaCloudIcon}</Dropzone.Accept> */}
          <Dropzone.Reject>Eroor</Dropzone.Reject>
          {/* <Dropzone.Idle>{mediaCloudIcon}</Dropzone.Idle> */}

          <div className="flex justify-center items-center h-full space-x-2">
            {mediaCloudIcon}
            <div className=" w-[50%] Xl:w-full sm:min-w-[260px]">
              <p className="text-black text-[13px] not-italic font-medium leading-[normal] hidden md:block lg:block xl:block  sm:hidden ">
                Select or drag and drop an image file here Supported formats:
                PNG, JPG, JPEG, WebP. Max file size: 10MB.
              </p>
            </div>
            <Button className="selectFile" size="xs" variant="outline">
              Select
            </Button>
          </div>
          <p className="text-[color:var(--Mandatory,#F00)]  text-sm italic font-medium leading-[normal]">
            {error}
          </p>
        </Dropzone>
      )}
    </div>
  );
}
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const Preview = ({ main, logo, setError }: any) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const imageUrl = URL.createObjectURL(logo);
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const logoFile = e.target.files && e.target.files[0];
    if (logoFile) {
      if (logoFile.size > MAX_FILE_SIZE_BYTES) {
        setError("File size exceeds 10MB limit");
        main(null);
      } else {
        main(logoFile);
      }
    }
  };
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="flex items-center p-4 bg-white border border-gray-300 rounded-lg">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
        <Image
          src={imageUrl} // You may want to use the actual image source from `logo`
          alt="bon ton logo"
          className="w-12 h-12 cursor-pointer"
          width={64}
          height={64}
          style={{ aspectRatio: "64 / 64", objectFit: "cover" }}
          onClick={open} 
        />
      </div>
      <div className="flex flex-col flex-grow ml-4">
        <span className="font-medium text-xs md:text-base text-wrap ">
          {logo
            ? logo.name.length > 15
              ? `${logo.name.substring(0, 12)}...${logo.name.substring(
                  logo.name.lastIndexOf(".") - 1
                )}`
              : logo.name
            : "No File"}
        </span>
        <span className="text-sm text-gray-500">
          {logo ? formatBytes(logo.size) : ""}
        </span>
      </div>
      <div className="flex space-x-2">
        <ImagePreivewModal
          logo={logo}
          opened={opened}
          open={open}
          close={close}
        />
        {/* THis Under Edit Icon */}
        <svg
          onClick={() => handleEditClick()}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500 cursor-pointer w-4"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
        <svg
          onClick={() => main(null)}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-500 cursor-pointer w-4"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </div>
      <input
        type="file"
        // @ts-ignore
        accept={IMAGE_MIME_TYPE}
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  );
};
const ImagePreivewModal = ({ logo, opened, open, close }: any) => {
  const imageUrl = URL.createObjectURL(logo);
  const preview = (
    <Image
      src={imageUrl}
      onLoad={() => URL.revokeObjectURL(imageUrl)}
      className="h2 !min-w-16"
      alt="logo"
      height={630}
      width={1200} 
    />
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{
          close: S.close,
          content: S.body,
        }}
      >
        {preview}
      </Modal>

      <svg
        onClick={open}
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500 cursor-pointer w-4"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx={12} cy={12} r={3} />
      </svg>
    </>
  );
};

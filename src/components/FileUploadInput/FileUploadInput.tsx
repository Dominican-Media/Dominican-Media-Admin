"use client";

import classes from "./FileUploadInput.module.css";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import Close from "@/assets/svgIcons/Close";
import { IMAGES } from "@/utilities/constants";

type FileUploadInputTypes = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  title: string;
  id?: string;
  accept?: string;
  notShowFiles?: boolean;
  imagePreview?: string | null;
  setImagePreview?: Dispatch<SetStateAction<string | null>>;
};

const FileUploadInput = ({
  files,
  setFiles,
  title,
  id,
  accept,
  notShowFiles,
  imagePreview,
  setImagePreview,
}: FileUploadInputTypes) => {
  // States
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Utils

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      e.dataTransfer.clearData();
    }

    setIsDraggingOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);

      setFiles((prevFiles) => {
        if (prevFiles?.length > 0) {
          return [...(prevFiles as File[]), ...selectedFiles];
        } else {
          return [...selectedFiles];
        }
      });

      if (accept?.includes("image")) {
        handleImageChange(e);
      }
    }
  };

  const handleImageChange = (e: any) => {
    if (setImagePreview) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);

        setImagePreview(imageUrl as string);
      } else {
        setImagePreview(null);
      }
    }
  };

  const filterFiles = (name: string) => {
    const filteredFiles = files?.filter((data) => {
      return data?.name !== name;
    });
    setFiles(filteredFiles);
    if (setImagePreview) setImagePreview(null);
  };

  return (
    <div className={classes.container}>
      <p>{title}</p>
      {imagePreview ? (
        <div className={classes.previewImage}>
          <img alt="Image upload" src={imagePreview} />
        </div>
      ) : (
        <div
          className={classes.uploadContainer}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={
            isDraggingOver
              ? { border: "2px dashed #000" }
              : { border: "1px solid #000" }
          }
        >
          <Image src={IMAGES.UPLOAD} alt="Upload" width={150} height={70} />

          <h4>
            Drag and drop files or <label htmlFor={id || "file"}>Browse</label>
          </h4>

          <input
            type="file"
            id={id || "file"}
            accept={accept}
            onChange={handleFileChange}
          />

          <p>Supported formates: JPEG, PNG</p>
        </div>
      )}

      {!notShowFiles && files?.length > 0 && (
        <div className={classes.uploaded}>
          <h4>Uploaded File</h4>

          {(files as File[])?.length > 0 &&
            files?.map((data, i) => {
              return (
                <div key={i}>
                  <span>{data?.name}</span>
                  <Close onClick={() => filterFiles(data?.name)} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;

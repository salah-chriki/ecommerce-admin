"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled: boolean;
  onchange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onchange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSuccess = (result: any) => {
    console.log(result);
    onchange(result.info.url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>

            <Image fill src={url} alt="Image" sizes="200px 200px" />
          </div>
        ))}
      </div>
      <div className="mb-4">
        {" "}
        <CldUploadWidget onSuccess={onSuccess} uploadPreset="bndlfzi1">
          {({ open }) => {
            return (
              <Button
                type="button"
                disabled={disabled}
                onClick={() => open()}
                variant="secondary"
              >
                <ImagePlus className="w-4 h-4 mr-2" /> Upload an Image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ImageUpload;

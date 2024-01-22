import React from "react";
import Image from "next/image";

interface ImageViewProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  rest?: {
    [x: string]: any;
  };
}

export const ImageView = ({
  src,
  alt,
  width,
  height,
  fill,
  ...rest
}: ImageViewProps) => {
  return (
    <Image
      id="img"
      src={src}
      alt={alt}
      fill={fill}
      quality={100}
      width={width}
      height={height}
      sizes="100%"
      unoptimized={true}

      {...rest}
    />
  );
};

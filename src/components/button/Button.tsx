import { ImageView } from "../imagePicker/ImageView";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string | undefined;
  text: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Button = ({
  onClick,
  className,
  text,
  src,
  alt,
  width,
  height,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {src && alt && (
        <ImageView
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={true}
        />
      )}{" "}
      {text}
    </button>
  );
};

export default Button;

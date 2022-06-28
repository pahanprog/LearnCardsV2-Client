import React, { useEffect, useRef, useState } from "react";

interface ButtonProps {
  title: string;
  disabled?: boolean;
  changeColorWhenDisabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "m" | "s";
  submit?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  disabled,
  changeColorWhenDisabled,
  onClick,
  icon,
  type,
  submit,
}: ButtonProps) => {
  const containerRef = useRef<HTMLDivElement | null>();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current && width === 0) {
      setWidth(containerRef.current.clientWidth);
    }
  }, []);

  return (
    <div
      className="flex items-center justify-between w-max"
      style={width ? { width } : {}}
      ref={(div) => (containerRef.current = div)}
    >
      <button
        disabled={disabled}
        type={submit ? "submit" : "button"}
        className={`${
          type === "m"
            ? "md:px-4 py-2 px-2 font-medium"
            : "px-1 py-1 font-normal"
        }  inline-flex justify-center w-full ${
          submit
            ? disabled && changeColorWhenDisabled
              ? "text-gray-800 bg-gray-200"
              : "text-purple-900 bg-purple-200 hover:bg-purple-300"
            : "text-blue-900 bg-blue-200 hover:bg-blue-300"
        } rounded-md  focus:focus:outline-none`}
        onClick={() => {
          console.log("CLICKED");
          onClick && onClick();
        }}
      >
        {icon ? icon : <div>{title}</div>}
      </button>
    </div>
  );
};

Button.defaultProps = {
  changeColorWhenDisabled: true,
  type: "m",
  submit: true,
};

import React, { useEffect, useState } from "react";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: () => void;
  style?: string;
  error?: string;
  type?: string;
  multiline?: boolean;
  showLabel?: boolean;
  showBorder?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  name,
  handleChange,
  onBlur,
  error,
  style,
  type,
  multiline,
  showLabel,
  showBorder,
}: TextInputProps) => {
  return (
    <div className={style ? style : "mb-1"}>
      {showLabel && (
        <div className="flex">
          <label htmlFor={name} className="font-medium md:text-md text-sm">
            {label}
          </label>
        </div>
      )}

      {multiline ? (
        <textarea
          className={`mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error && "border-red-500"
          }`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          autoComplete="off"
        />
      ) : (
        <input
          type={type}
          className={`appearance-none ${
            showBorder && "border rounded shadow mt-2"
          } w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error && "border-red-500"
          }`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          autoComplete="off"
        />
      )}
      {showBorder && <div className="h-4 text-sm text-red-500">{error}</div>}
    </div>
  );
};

TextInput.defaultProps = {
  type: "text",
  multiline: false,
  showLabel: true,
  showBorder: true,
};

import React, { useState } from "react";
import DeleteDeckButton from "./DeleteDeckButton";

interface SideDeckProps {
  title: string;
  description: string;
  id: number;
  changeDeck: Function;
  selected?: boolean;
}

export const SideDeck: React.FC<SideDeckProps> = ({
  description,
  id,
  title,
  changeDeck,
  selected,
}) => {
  const handleClick = () => {
    changeDeck(id);
  };

  return (
    <div
      onClick={handleClick}
      className={`mx-1 my-2 mb-4 relative group ${
        selected ? "mr-4 border-l-8 border-purple-300" : null
      }`}
    >
      <div className="px-4 last:mb-0 cursor-pointer">
        <div className="truncate ">{title}</div>
        <div className="truncate ">{description}</div>
      </div>
    </div>
  );
};

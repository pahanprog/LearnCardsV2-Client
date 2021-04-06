import React from "react";
import DeleteDeckButton from "./DeleteDeckButton";

interface SideDeckProps {
  title: string;
  description: string;
  id: number;
  changeDeck: Function;
}

export const SideDeck: React.FC<SideDeckProps> = ({
  description,
  id,
  title,
  changeDeck,
}) => {
  const handleClick = () => {
    changeDeck(id);
  };

  return (
    <div
      className="mb-4 p-2 last:mb-0 cursor-pointer relative group"
      onClick={handleClick}
    >
      <DeleteDeckButton id={id} title={title} />
      <div className="truncate ">{title}</div>
      <div className="truncate ">{description}</div>
    </div>
  );
};

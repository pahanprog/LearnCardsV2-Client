import React, { useState } from "react";
import { useRouter } from "next/router";

interface SideDeckProps {
  title: string;
  description: string;
  id: number;
  selected?: boolean;
}

export const SideDeck: React.FC<SideDeckProps> = ({
  description,
  id,
  title,
  selected,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (!selected) {
      router.push(`/dashboard?deck=${id}`, undefined, { shallow: true });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`mx-1 my-2 mb-4 relative group ${
        selected ? "mr-4 border-l-8 border-purple-300" : null
      }`}
    >
      <div
        className={`px-4 ${selected ? "pl-2" : null} last:mb-0 cursor-pointer`}
      >
        <div className="truncate ">{title}</div>
        <div className="truncate ">{description}</div>
      </div>
    </div>
  );
};

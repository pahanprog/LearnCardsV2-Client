import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DeleteDeckButton from "./DeleteDeckButton";
import { useMeQuery } from "../generated/graphql";

interface SideDeckProps {
  title: string;
  description: string;
  id: number;
  selected?: boolean;
  edit: boolean;
  creator: string;
}

export const SideDeck: React.FC<SideDeckProps> = ({
  description,
  id,
  title,
  selected,
  edit,
  creator,
}) => {
  const [{ data: me }] = useMeQuery();
  const router = useRouter();

  const handleClick = () => {
    if (!selected) {
      router.push(`/dashboard?deck=${id}`, undefined, { shallow: true });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`ml-1 mr-4 my-2 mb-4 relative group ${
        selected ? "border-l-8 border-purple-300" : null
      }`}
    >
      <div
        className={`px-4 ${selected ? "pl-2" : null} last:mb-0 cursor-pointer`}
      >
        <div className="truncate text-2xl">{title}</div>
        <div className="truncate text-base">{description}</div>
      </div>
      {edit ? (
        creator == me?.me?.username ? (
          <DeleteDeckButton id={id} title={title} />
        ) : (
          <DeleteDeckButton id={id} title={title} learning />
        )
      ) : null}
    </div>
  );
};

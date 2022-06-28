import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DeleteDeckButton from "./DeleteDeckButton";
import { useMeQuery } from "../generated/graphql";
import { ResponsiveSideMenuContext } from "../context/ResponsiveSideMenuProvider";

interface SideDeckProps {
  title: string;
  description: string;
  id: number;
  selected?: boolean;
  edit: boolean;
  isLearner: boolean;
}

export const SideDeck: React.FC<SideDeckProps> = ({
  description,
  id,
  title,
  selected,
  edit,
  isLearner,
}) => {
  const [{ data: me }] = useMeQuery();
  const router = useRouter();
  const { toggleMenu } = useContext(ResponsiveSideMenuContext);

  const handleClick = () => {
    if (!selected) {
      router.push(`/dashboard?deck=${id}`, undefined, { shallow: true });
    }
    toggleMenu();
  };

  return (
    <div
      onClick={handleClick}
      className={` mr-4 mt-2 mb-4 relative group ${
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
        <DeleteDeckButton id={id} title={title} learning={isLearner} />
      ) : null}
    </div>
  );
};

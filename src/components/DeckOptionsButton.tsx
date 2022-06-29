import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useDeleteDeckMutation } from "../generated/graphql";

interface DeckOptionsButtonProps {
  id: number;
  learning: boolean;
}

export const DeckOptionsButton = ({ id, learning }: DeckOptionsButtonProps) => {
  const [{}, deleteDeck] = useDeleteDeckMutation();
  const deck = {
    id: id,
    isLearner: learning,
  };

  return (
    <Menu as="div" className="relative grid place-items-center z-20">
      <Menu.Button className="focus:outline-none">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEllipsisH} size="lg" />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-put duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="py-2 absolute left-0 top-10 w-56 origin-top-righti bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="grid place-items-center">
            <Menu.Item>
              <button
                className="text:xl px-2 py-2 w-full hover:bg-gray-100"
                onClick={() => {
                  deleteDeck(deck);
                }}
              >
                Удалить
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

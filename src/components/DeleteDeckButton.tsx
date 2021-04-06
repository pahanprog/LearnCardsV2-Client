import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDeleteDeckMutation } from "../generated/graphql";
import Modal from "./Modal";

interface DeleteDeckButtonProps {
  id: number;
  title: string;
}

const DeleteDeckButton: React.FC<DeleteDeckButtonProps> = ({ id, title }) => {
  const [{ error, data }, deleteDeck] = useDeleteDeckMutation();
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const deck = {
      id: id,
    };

    deleteDeck(deck);

    closeModal();
  };

  return (
    <>
      <div
        className="w-5 h-5 rounded-full transition-opacity opacity-0 group-hover:opacity-100 bg-opacity-50 bg-gray-300 cursor-pointer absolute right-0 top-0 mt-2 -mr-2 grid place-items-center"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faTimes} size="sm" />
      </div>
      <Modal title="Caution" show={open} close={closeModal}>
        <div className="text-center flex-1">
          You are about to remove the <strong>{title}</strong> deck from your
          library. Are you sure that you wish to proceed?
        </div>
        <div className="flex items-center">
          <div className="flex-1 flex justify-end mr-4">
            <span
              className="py-1 px-4 bg-purple-700 text-white fint-semibold rounded-md"
              onClick={closeModal}
            >
              Cancel
            </span>
          </div>

          <div
            className="flex-1 flex justify-start ml-4 underline"
            onClick={handleDelete}
          >
            <span>Yes, remove deck</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteDeckButton;

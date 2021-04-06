import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useCreateDeckMutation } from "../generated/graphql";
import Modal from "./Modal";

export default function CreateDeckBtn() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(String);
  const [description, setDescription] = useState(String);

  const [{ data }, create] = useCreateDeckMutation();

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const handleCreate = () => {
    const deck = {
      title,
      description,
    };

    create(deck);

    closeModal();
  };

  return (
    <>
      <div
        className="w-9 h-9 rounded-full bg-white cursor-pointer grid place-items-center"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </div>
      <Modal title="Create New Deck" close={closeModal} show={open}>
        <input
          className="w-full border-2 border-gray-300 p-2 rounded-md mb-6"
          placeholder="Title of Deck"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border-2 border-gray-300 p-2 rounded-md mb-6"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="w-full grid place-items-center">
          <button
            className="bg-purple-600 text-white font-semibold py-2 px-10 rounded-md"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </Modal>
    </>
  );
}

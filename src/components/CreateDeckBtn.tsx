import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import result from "postcss/lib/result";
import React, { Fragment, useState } from "react";
import { useCreateDeckMutation } from "../generated/graphql";
import { DeckPreviewContext } from "../pages/dashboard";

export default function CreateDeckBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState(String);
  const [description, setDescription] = useState(String);

  const [{ data }, create] = useCreateDeckMutation();

  const router = useRouter();
  const { decks, setDecks } = React.useContext(DeckPreviewContext);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  const handleCreate = async () => {
    const deck = {
      title,
      description,
    };

    const result = await create(deck);

    if (result.data?.createDeck) {
      setDecks([...decks, result.data.createDeck]);
      router.push(`/dashboard?deck=${result.data.createDeck.id}`, undefined, {
        shallow: true,
      });
    }

    closeModal();
  };

  return (
    <div className="mt-2 grid place-items-center">
      <div className="cursor-pointer flex items-center" onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} size="1x" />
        <span className="ml-4"> Create a new deck</span>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-100 shadow-xl rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl text-center font-medium leading-6 text-gray-900"
                >
                  Create new deck
                </Dialog.Title>
                <div className="mt-4">
                  <div className="px-8">
                    <div>
                      <label htmlFor="title" className="text-lg font-medium">
                        Title
                      </label>
                      <input
                        className="w-full border-2 border-gray-300 p-2 rounded-md mb-6 focus:outline-none"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="text-lg font-medium"
                      >
                        Description
                      </label>
                      <input
                        className="w-full border-2 border-gray-300 p-2 rounded-md mb-6 focus:outline-none"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex justify-around">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={handleCreate}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

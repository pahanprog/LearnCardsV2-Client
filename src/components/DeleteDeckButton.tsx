import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useDeleteDeckMutation } from "../generated/graphql";
import { DeckPreviewContext } from "../pages/dashboard";

interface DeleteDeckButtonProps {
  id: number;
  title: string;
  learning: boolean;
}

const DeleteDeckButton: React.FC<DeleteDeckButtonProps> = ({
  id,
  title,
  learning,
}) => {
  const [{}, deleteDeck] = useDeleteDeckMutation();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    const deck = {
      id: id,
      isLearner: learning,
    };

    const result = await deleteDeck(deck);

    if (result.data?.deleteDeck) {
      closeModal();
    }
  };

  return (
    <>
      <div
        style={{ right: "-1rem" }}
        className="absolute top-0 md:opacity-0 opacity-100 group-hover:opacity-100 text-gray-600 cursor-pointer h-full flex items-center px-4"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faTimes} size="sm" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-100 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  ??????????????????
                </Dialog.Title>
                <div className="mt-4">
                  <div className="text-center flex-1">
                    ???? ?????????????????????? ?????????????? ???????????? ?? ??????????????????????????{" "}
                    <strong>{title}</strong> ???? ???????????? ???????????? ??????????. ???? ??????????????
                    ?????? ???????????? ?????????????????????
                  </div>
                  <div className="flex justify-around mt-4">
                    <button
                      onClick={closeModal}
                      className="cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      ????????????????
                    </button>

                    <button
                      onClick={handleDelete}
                      className="cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-red-800 bg-red-200 rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    >
                      ??????????????????????
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteDeckButton;

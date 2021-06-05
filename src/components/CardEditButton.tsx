import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition, Dialog } from "@headlessui/react";
import { title } from "node:process";
import React, { Fragment, useEffect, useState } from "react";
import { useUpdateCardMutation } from "../generated/graphql";
import Modal from "./Modal";

interface CardEditButtonProps {
  id: number;
  question: string;
  answer: string;
}

const CardEditButton: React.FC<CardEditButtonProps> = ({
  id,
  question,
  answer,
}) => {
  const [{ error }, update] = useUpdateCardMutation();

  const [isOpen, setIsOpen] = useState(false);

  const [questionValue, setQuestionValue] = useState(String);
  const [answerValue, setAnswerValue] = useState(String);

  useEffect(() => {
    setQuestionValue(question);
    setAnswerValue(answer);
  }, [question, answer]);

  const openModal = () => {
    setQuestionValue(question);
    setAnswerValue(answer);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const card = {
      id: id,
      question: questionValue,
      answer: answerValue,
    };

    update(card);

    closeModal();
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        color="black"
        size="1x"
        className="mb-4 cursor-pointer"
        onClick={openModal}
      />
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
                  Edit card
                </Dialog.Title>
                <div className="mt-4">
                  <form
                    className="w-full flex-1 flex flex-col"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="flex flex-1">
                      <div className="flex-1 mr-2 flex flex-col">
                        <label>Question</label>
                        <textarea
                          value={questionValue}
                          onChange={(e) => setQuestionValue(e.target.value)}
                          className="w-full h-full border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="flex-1  ml-2 flex flex-col">
                        <label>Answer</label>
                        <textarea
                          value={answerValue}
                          onChange={(e) => setAnswerValue(e.target.value)}
                          className="w-full h-full border-2 border-gray-300 p-2 rounded-md rounded-md focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="w-full flex justify-around mt-6">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardEditButton;

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
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

  const [open, setOpen] = useState(false);

  const [questionValue, setQuestionValue] = useState(String);
  const [answerValue, setAnswerValue] = useState(String);

  useEffect(() => {
    setQuestionValue(question);
    setAnswerValue(answer);
  }, [question, answer]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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
      <Modal title="Edit Card" close={closeModal} show={open}>
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

          <div className="w-full flex mt-6">
            <div className="flex-1 flex justify-end mr-2">
              <span className="underline cursor-pointer" onClick={closeModal}>
                Cancel
              </span>
            </div>
            <div className="flex-1 flex justify-start ml-2">
              <button
                type="submit"
                className="bg-purple-700 px-4 py-1 text-white rounded font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CardEditButton;

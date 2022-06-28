import { faPen, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useUpdateCardMutation } from "../generated/graphql";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

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
  const [loading, setLoading] = useState(false);

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
        className="cursor-pointer"
        onClick={openModal}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen md:px-4 px-2 text-center">
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
              <div className="inline-block w-full max-w-md md:p-6 p-4 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-100 shadow-xl rounded-xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl text-center font-medium leading-6 text-gray-900"
                >
                  Отредактировать карточку
                </Dialog.Title>
                <div className="mt-6">
                  <form
                    className="w-full flex-1 flex flex-col"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="flex flex-1 justify-center">
                      <TextInput
                        label="Вопроc"
                        placeholder="Вопроc"
                        value={questionValue}
                        name="question"
                        handleChange={(e) => setQuestionValue(e.target.value)}
                        // error={
                        //   errors.title && touched.title
                        //     ? `${errors.title}`
                        //     : undefined
                        // }
                        onBlur={() => {}}
                        multiline
                        style="mr-2"
                      />
                      <TextInput
                        label="Ответ"
                        placeholder="Ответ"
                        value={answerValue}
                        name="answer"
                        handleChange={(e) => setAnswerValue(e.target.value)}
                        // error={
                        //   errors.title && touched.title
                        //     ? `${errors.title}`
                        //     : undefined
                        // }
                        onBlur={() => {}}
                        multiline
                      />
                    </div>
                    <div className="w-full flex justify-around">
                      <Button
                        title="Отменить"
                        disabled={loading}
                        changeColorWhenDisabled={false}
                        onClick={closeModal}
                        submit={false}
                      />
                      <Button
                        title="Сохранить"
                        disabled={
                          // loading
                          //   ? true
                          //   : (touched.title && errors.title) ||
                          //     (touched.description && errors.description)
                          //   ? true
                          //   : false
                          false
                        }
                        changeColorWhenDisabled={!loading}
                        // onClick={() => {
                        //   if (!isValid) {
                        //     if (errors.title || values.title === "") {
                        //       setFieldTouched("title");
                        //     }
                        //     if (
                        //       errors.description ||
                        //       values.description === ""
                        //     ) {
                        //       setFieldTouched("description");
                        //     }

                        //     return;
                        //   }
                        // }}
                        icon={
                          loading && (
                            <div style={{ height: "24px" }}>
                              <FontAwesomeIcon
                                icon={faSpinner}
                                size="lg"
                                style={{ width: "24px", height: "24px" }}
                                className="animate-spin"
                              />
                            </div>
                          )
                        }
                      />
                      {/* <button
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
                      </button> */}
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

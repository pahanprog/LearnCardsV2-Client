import React from "react";
import CardEditButton from "./CardEditButton";

interface CardPreviewProps {
  id: number;
  question: string;
  answer: string;
  number: number;
  canEdit: boolean;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  id,
  number,
  answer,
  question,
  canEdit,
}) => {
  return (
    <div className="w-full 2xl:w-3/4 2xl:mx-auto flex mb-4 first:mt-4">
      <div className="grid place-items-center mr-3">{number}</div>
      <div className="md:p-8 p-6 grid place-items-center flex-1 border-2 border-r-0 border-gray-300 rounded-l-lg text-lg">
        {question}
      </div>
      <div className="md:p-8 p-6 grid place-items-center flex-1 border-2  border-gray-300 rounded-r-lg text-lg">
        {answer}
      </div>
      <div className="flex flex-col justify-center items-center ml-3">
        {canEdit ? (
          <CardEditButton id={id} answer={answer} question={question} />
        ) : null}
      </div>
    </div>
  );
};

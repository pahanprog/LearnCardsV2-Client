import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ModalProps {
  show: boolean;
  close: Function;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ show, close, title, children }) => {
  return (
    <div
      className={`h-screen w-screen bg-opacity-40 bg-gray-400 fixed left-0 top-0 place-items-center ${
        show ? "grid" : "hidden"
      }`}
    >
      <div className="w-full min-h-2/6 max-w-lg bg-white p-6 rounded-md relative flex flex-col">
        <div
          className="w-8 h-8 rounded-full bg-black cursor-pointer absolute right-0 top-0 mt-2 mr-2 grid place-items-center"
          onClick={() => close()}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" color="white" />
        </div>
        <div className="text-4xl font-semibold text-center mb-6">{title}</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

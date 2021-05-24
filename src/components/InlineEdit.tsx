import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface InlineEditProps {
  edit: boolean;
  value: string;
  changeState: Function;
  textarea?: boolean;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  edit,
  value,
  changeState,
  textarea,
}) => {
  const [valueCopy, setValueCopy] = useState(value);

  useEffect(() => {
    setValueCopy(value);
  }, [value]);

  return (
    <div className="flex items-center group mb-3">
      {edit ? (
        <div
          className="w-full border-2 border-purple-500 rounded-md px-2
        py-1 flex items-center"
        >
          {textarea ? (
            <textarea
              className="w-full px-2 text-2xl font-bold focus:outline-none bg-transparent"
              value={valueCopy}
              onChange={(e) => setValueCopy(e.target.value)}
            />
          ) : (
            <input
              className="w-full px-2 text-3xl font-bold focus:outline-none bg-transparent"
              value={valueCopy}
              onChange={(e) => setValueCopy(e.target.value)}
            />
          )}
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                changeState({ value: value, edit: false });
                setValueCopy(value);
              }}
              className="cursor-pointer rounded-full hover:bg-gray-200"
            />
            <span
              className="rounded-md my-2 py-1 px-4 mx-3 bg-purple-700 text-white cursor-pointer font-semibold"
              onClick={() =>
                changeState({ value: valueCopy, edit: false, update: true })
              }
            >
              Save
            </span>
          </div>
        </div>
      ) : (
        <div className={`${textarea ? "text-3xl" : "text-4xl"} font-bold`}>
          {value}
        </div>
      )}
      <FontAwesomeIcon
        onClick={() => changeState({ value: value, edit: true })}
        icon={faPen}
        size="2x"
        className={`ml-2 p-2 transition-opacity bg-gray-200 opacity-0 cursor-pointer rounded-full group-hover:opacity-100 ${
          edit ? "hidden" : null
        }`}
      />
    </div>
  );
};

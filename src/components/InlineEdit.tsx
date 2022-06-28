import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "./Button";

interface InlineEditProps {
  edit: boolean;
  value: string;
  changeState: Function;
  description?: boolean;
  canEdit: boolean;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  edit,
  value,
  changeState,
  description,
  canEdit,
}) => {
  const [valueCopy, setValueCopy] = useState(value);

  useEffect(() => {
    setValueCopy(value);
  }, [value]);

  return (
    <div className="flex items-center group mb-3">
      {edit ? (
        <div
          className="w-full border-2 border-purple-400 rounded-md px-2
        py-1 flex items-center  flex-col md:flex-row"
        >
          {description ? (
            <textarea
              className="w-full px-2 text-xl focus:outline-none bg-transparent"
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
          <div className="flex items-center self-center mt-2 md:mt-2">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                changeState({ value: value, edit: false });
                setValueCopy(value);
              }}
              className="cursor-pointer rounded-full hover:bg-gray-200 mr-2"
            />
            <Button
              title="Сохранить"
              onClick={() =>
                changeState({ value: valueCopy, edit: false, update: true })
              }
            />
          </div>
        </div>
      ) : (
        <div className={`${description ? "text-xl" : "text-4xl font-bold"}`}>
          {value}
        </div>
      )}
      {canEdit ? (
        <div
          className={`ml-2 h-6 w-6 p-1 grid place-items-center transition-all opacity-0 group-hover:opacity-100 hover:bg-gray-200 cursor-pointer rounded-full group ${
            edit ? "hidden" : null
          }`}
          onClick={() => changeState({ value: value, edit: true })}
        >
          <FontAwesomeIcon icon={faPen} size="sm" className="text-gray-700" />
        </div>
      ) : null}
    </div>
  );
};

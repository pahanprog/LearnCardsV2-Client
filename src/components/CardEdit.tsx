import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useUpdateDeckCardsMutation } from "../generated/graphql";

interface CardEditProps {
  handleDone: Function;
  deckId: number;
  cards: { id?: number; number: number; question: string; answer: string }[];
}

interface CardsState {
  __typename?: string;
  id?: number;
  number: number;
  question: string;
  answer: string;
}

const CardEdit: React.FC<CardEditProps> = ({ handleDone, cards, deckId }) => {
  const [{ data, error, fetching }, update] = useUpdateDeckCardsMutation();

  const [cardsValues, setCardsValues] = useState<CardsState[]>(cards);
  const [deleteValues, setDeleteValues] = useState<CardsState[]>([]);

  useEffect(() => {
    if (cards.length == 0) {
      setCardsValues([{ number: 1, answer: "", question: "" }]);
    } else {
      setCardsValues(cards);
    }
  }, [cards]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...cardsValues];
    if (name == "question" || name == "answer") {
      list[index][name] = value;
      setCardsValues(list);
    } else {
      return;
    }
  };

  const handleDelete = (index: number) => {
    const list = [...cardsValues];
    if (list[index].id) {
      setDeleteValues([...deleteValues, list[index]]);
    }
    const num = list[index].number;
    list.splice(index, 1);
    if (index != list.length) {
      list[index].number = num;
    }
    setCardsValues(list);
  };

  const handleAdd = () => {
    setCardsValues([
      ...cardsValues,
      {
        number: cardsValues[cardsValues.length - 1].number + 1,
        answer: "",
        question: "",
      },
    ]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    deleteValues.forEach((i) => delete i.__typename);
    cardsValues.forEach((j) => delete j.__typename);

    const deck = {
      id: deckId,
      del: deleteValues,
      update: cardsValues,
    };

    update(deck);
  };

  return (
    <form
      className="w-full 2xl:w-3/4 2xl:mx-auto mb-4 flex flex-col px-6"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex-1">
        {cardsValues.map((card, index) => {
          return (
            <div className="flex items-center mb-4" key={index}>
              <div className="mr-4">{card.number}</div>
              <input
                type="text"
                name="question"
                className="flex-1 mr-2 border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                value={cardsValues[index].question}
                onChange={(e) => handleChange(e, index)}
              />
              <input
                type="text"
                name="answer"
                className="flex-1 ml-2 border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                value={cardsValues[index].answer}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => {
                  const { key } = e;
                  if (key === "Tab" && index == cardsValues.length - 1) {
                    handleAdd();
                  }
                }}
              />
              <div
                className="ml-4 w-10 h-8 rounded grid place-items-center text-red-800 bg-red-200 cursor-pointer"
                onClick={() => handleDelete(index)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center cursor-pointer text-purple-600">
          <FontAwesomeIcon icon={faPlus} />
          <div className="ml-2 font-semibold" onClick={handleAdd}>
            Add Card
          </div>
        </div>
        <div className="flex items-center">
          <span
            className="cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 mr-4"
            onClick={() => handleDone()}
          >
            Cancel
          </span>
          <button
            type="submit"
            className="cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default CardEdit;

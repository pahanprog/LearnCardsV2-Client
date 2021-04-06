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
            <div className="flex items-center mb-4">
              <div className="mr-4">{card.number}</div>
              <input
                type="text"
                name="question"
                className="flex-1 mr-2 border-2 border-gray-300 p-2 rounded-md rounded-md focus:outline-none"
                value={cardsValues[index].question}
                onChange={(e) => handleChange(e, index)}
              />
              <input
                type="text"
                name="answer"
                className="flex-1 ml-2 border-2 border-gray-300 p-2 rounded-md rounded-md focus:outline-none"
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
                className="ml-4 w-10 h-8 rounded grid place-items-center bg-red-500 cursor-pointer"
                onClick={() => handleDelete(index)}
              >
                <FontAwesomeIcon icon={faTimes} color="white" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center cursor-pointer">
          <FontAwesomeIcon icon={faPlus} color="#6d28d9" />
          <div
            className="ml-2 text-purple-700 font-semibold"
            onClick={handleAdd}
          >
            Add Card
          </div>
        </div>
        <div className="flex items-center">
          <span
            className="underline font-semibold mr-4 cursor-pointer"
            onClick={() => handleDone()}
          >
            Cancel
          </span>
          <button
            type="submit"
            className="px-4 py-1 bg-purple-700 rounded-md text-white font-semibold cursor-pointer max-w-max"
          >
            Done
          </button>
        </div>
      </div>
    </form>
  );
};

export default CardEdit;

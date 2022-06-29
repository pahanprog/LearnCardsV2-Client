import {
  faPlus,
  faSpinner,
  faTimes,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useUpdateDeckCardsMutation } from "../generated/graphql";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Button } from "./Button";

interface CardEditProps {
  handleDone: (
    newCards: {
      __typename?: "Card" | undefined;
      id: number;
      order: number;
      question: string;
      answer: string;
    }[],
    update: boolean
  ) => void;
  deckId: number;
  cards: { id?: number; order: number; question: string; answer: string }[];
}

interface CardsState {
  __typename?: string;
  id?: number;
  order: number;
  question: string;
  answer: string;
}

const CardEdit: React.FC<CardEditProps> = ({ handleDone, cards, deckId }) => {
  const [loading, setLoading] = useState(false);
  const [{ data, error, fetching }, update] = useUpdateDeckCardsMutation();

  const [cardsValues, setCardsValues] = useState<CardsState[]>(cards);
  const [deleteValues, setDeleteValues] = useState<CardsState[]>([]);

  useEffect(() => {
    if (cards.length == 0) {
      setCardsValues([{ order: 1, answer: "", question: "" }]);
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
    list.splice(index, 1);
    const maped = list.map((value, index) => {
      return { ...value, order: index + 1 };
    });
    setCardsValues(maped);
  };

  const handleAdd = () => {
    if (cardsValues.length === 0) {
      setCardsValues([{ order: 1, answer: "", question: "" }]);
      return;
    }
    setCardsValues([
      ...cardsValues,
      {
        order: cardsValues[cardsValues.length - 1].order + 1,
        answer: "",
        question: "",
      },
    ]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    deleteValues.forEach((i) => delete i.__typename);
    cardsValues.forEach((j) => delete j.__typename);

    const deck = {
      id: deckId,
      del: deleteValues,
      update: cardsValues,
    };

    const result = await update(deck);

    if (result.error) {
      console.error(result.error);
    }

    if (result.data?.updateDeckCards?.cards) {
      handleDone(result.data.updateDeckCards.cards, true);
    }
  };

  const { height, width } = useWindowDimensions();

  return (
    <form
      className="w-full 2xl:w-3/4 2xl:mx-auto mb-4 flex flex-col md:px-6 px-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex-1">
        {cardsValues.map((card, index) => {
          if (width >= 768) {
            return (
              <div className="flex items-center mb-4 " key={index}>
                <div className="mr-4">{card.order}</div>
                <input
                  type="text"
                  name="question"
                  placeholder="Вопрос"
                  className="w-full mr-2 border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                  value={cardsValues[index].question}
                  onChange={(e) => handleChange(e, index)}
                />
                <input
                  type="text"
                  name="answer"
                  placeholder="Ответ"
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none"
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
                  className="ml-4 w-20 h-8 rounded grid place-items-center text-red-800 bg-red-200 cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            );
          } else {
            return (
              <div
                className="flex items-center mb-2 pb-2 border-b-2"
                key={index}
              >
                <div className="mr-2">{card.order}</div>
                <div>
                  <input
                    type="text"
                    name="question"
                    placeholder="Вопрос"
                    className="w-full mb-2 border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                    value={cardsValues[index].question}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <input
                    type="text"
                    name="answer"
                    placeholder="Ответ"
                    className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                    value={cardsValues[index].answer}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => {
                      const { key } = e;
                      if (key === "Tab" && index == cardsValues.length - 1) {
                        handleAdd();
                      }
                    }}
                  />
                </div>
                <div
                  className="ml-2 w-12 h-8 rounded grid place-items-center text-red-800 bg-red-200 cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="flex flex-col items-start md:flex-row md:items-center w-full justify-between">
        <div className="flex items-center cursor-pointer text-purple-600 mb-4 md:mb-0">
          <FontAwesomeIcon icon={faPlus} />
          <div className="ml-2 font-semibold" onClick={handleAdd}>
            Добавить карточку
          </div>
        </div>
        <div className="flex items-center">
          <Button
            title="Отменить"
            disabled={loading}
            changeColorWhenDisabled={false}
            onClick={() => handleDone([], false)}
            submit={false}
          />
          <div className="ml-4">
            <Button
              title="Сохранить"
              disabled={
                loading
                  ? true
                  : // : (touched.title && errors.title) ||
                    //   (touched.description && errors.description)
                    // ? true
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
          </div>
          {/* <button
            type="submit"
            className="cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
          >
            Save
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default CardEdit;

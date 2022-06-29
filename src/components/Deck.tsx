import {
  faEllipsisH,
  faPlay,
  faShareAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  useDeckQuery,
  useMeQuery,
  useStartLearningSessionMutation,
} from "../generated/graphql";
import { InlineEdit } from "./InlineEdit";
import { useUpdateDeckInfoMutation } from "../generated/graphql";
import { CardPreview } from "./CardPreview";
import Learner from "./Learner";
import CardEdit from "./CardEdit";
import { userInfo } from "os";
import { SessionContext } from "../context/SessionProvider";
import { useRouter } from "next/router";

interface DeckProps {
  id: number;
}

interface inlineState {
  value: string;
  edit: boolean;
  update?: boolean;
}

const Deck: React.FC<DeckProps> = ({ id }) => {
  const [{}, update] = useUpdateDeckInfoMutation();
  const [{}, learn] = useStartLearningSessionMutation();
  const [{ data, fetching }] = useDeckQuery({
    variables: { id: id },
    requestPolicy: "network-only",
  });
  const [{ data: meQ }] = useMeQuery();
  const router = useRouter();

  const [bodyCards, setBodyCards] = useState(true);
  const [editCards, setEditCards] = useState(false);

  const { setSessionId, currentCardId, setSessionCards, setCurrentCardId } =
    useContext(SessionContext);

  const [title, setTitle] = useState<inlineState>({ value: "", edit: false });
  const [desc, setDesc] = useState<inlineState>({ value: "", edit: false });
  const [cards, setCards] = useState<
    {
      __typename?: "Card" | undefined;
      id: number;
      order: number;
      question: string;
      answer: string;
    }[]
  >([]);

  // const flag = useRef(-1);

  useEffect(() => {
    if (data?.deck) {
      // if (!title.value || flag.current !== id)
      setTitle({ ...title, value: data.deck.title });
      // if (!desc.value || flag.current !== id)
      setDesc({ ...desc, value: data.deck.description });
      // if (flag.current !== id) {
      //   flag.current = id;
      // }
      setCards(data.deck.cards);
    }
    setEditCards(false);
    setBodyCards(true);
  }, [data, fetching]);

  useEffect(() => {
    setEditCards(false);
  }, [bodyCards]);

  const updateTitle = (obj: inlineState) => {
    if (obj.update) {
      setTitle({ ...title, edit: obj.edit, value: obj.value });
      update({ id: id, title: obj.value, description: desc.value });
    } else {
      setTitle(obj);
    }
  };

  const updateDesc = (obj: inlineState) => {
    if (obj.update) {
      setDesc({ ...desc, edit: obj.edit, value: obj.value });
      update({ id: id, title: title.value, description: obj.value });
    } else {
      setDesc(obj);
    }
  };

  const handleAddClick = () => {
    setEditCards(true);
  };

  const handleEditDone = (
    newCards: {
      __typename?: "Card" | undefined;
      id: number;
      order: number;
      question: string;
      answer: string;
    }[],
    update: boolean
  ) => {
    if (update) {
      setCards(newCards);
    }
    setEditCards(false);
  };

  return (
    <>
      {!data?.deck ? (
        <div className="grid place-items-center px-2">
          <div>
            <div className="text-xl">
              У вас еще нет колод. Создайте или найдите нужную вам колоду.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-gray-800 flex-1 overflow-y-hidden">
          {fetching ? (
            <div className="grid place-items-center h-full w-full">
              <FontAwesomeIcon icon={faSpinner} spin size="5x" />
            </div>
          ) : data?.deck ? (
            <div className="md:p-8 p-4">
              <InlineEdit
                edit={title.edit}
                value={title.value}
                changeState={updateTitle}
                canEdit={data.deck.canEdit}
              />
              <InlineEdit
                edit={desc.edit}
                value={desc.value}
                changeState={updateDesc}
                canEdit={data.deck.canEdit}
                description
              />
              <div className="flex mb-3">
                <div className="mr-2">Создатель:</div>
                <div className="text-purple-700">
                  {data.deck.creator.username}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="flex">
                  <div
                    title="Learn"
                    className="w-8 h-8 bg-gray-300 grid place-items-center rounded-full cursor-pointer"
                    onClick={async () => {
                      const result = await learn({ deckId: id });

                      if (result.data?.startLearningSession?.id) {
                        setSessionId(result.data.startLearningSession.id);
                        setSessionCards(
                          result.data.startLearningSession.cards.map(
                            (card) => card.id
                          )
                        );
                        setCurrentCardId(
                          result.data.startLearningSession.cards[0].id
                        );
                        router.replace(
                          `/learn/${result.data.startLearningSession.cards[0].id}`,
                          undefined
                        );
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </div>
                  <div
                    title="Share"
                    className="w-8 h-8 bg-gray-300 grid place-items-center rounded-full cursor-pointer ml-3"
                  >
                    <FontAwesomeIcon icon={faShareAlt} />
                  </div>
                  <div
                    title="Options"
                    className="w-8 h-8 bg-gray-300 grid place-items-center rounded-full cursor-pointer ml-3"
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="w-full displat-flex">
            <ul className="border-b-2 border-gray-500 list-none flex bg-gray-300 font-semibold">
              <li
                className={`flex-1 grid place-items-center border-b-4 ${
                  bodyCards ? "border-gray-500" : "border-gray-300"
                } py-2 cursor-pointer`}
                onClick={() => setBodyCards(true)}
              >
                <div>Карточек: ({cards.length})</div>
              </li>
              <li
                className={`flex-1 grid place-items-center border-b-4 ${
                  bodyCards ? "border-gray-300" : "border-gray-500"
                } py-2 cursor-pointer`}
                onClick={() => setBodyCards(false)}
              >
                <div>Студентов: ({data?.deck?.learners.length})</div>
              </li>
            </ul>
          </div>
          <div className=" overflow-auto flex-1 overflow-y-auto">
            {bodyCards ? (
              editCards ? (
                <div className="py-4">
                  <CardEdit
                    handleDone={handleEditDone}
                    cards={cards}
                    deckId={id}
                  />
                </div>
              ) : cards.length == 0 ? (
                data.deck.canEdit ? (
                  <>
                    <div className="p-4 text-lg">
                      В вашей колоде еще нет карточек. Добавьте карточки чтобы
                      начать изучение.
                    </div>
                    <span
                      className="mt-2 mx-3 cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
                      onClick={handleAddClick}
                    >
                      Добавить карточки
                    </span>
                  </>
                ) : (
                  <div>В этой колоде нет карточек </div>
                )
              ) : (
                <div className="p-4">
                  {cards.map((card) => {
                    return (
                      <CardPreview
                        id={card.id}
                        question={card.question}
                        answer={card.answer}
                        key={card.id}
                        number={card.order}
                        canEdit={data.deck!.canEdit}
                      />
                    );
                  })}
                  {data?.deck?.canEdit ? (
                    <span
                      className="my-2 mx-3 cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
                      onClick={handleAddClick}
                    >
                      Добавить карточки
                    </span>
                  ) : null}
                </div>
              )
            ) : (
              data?.deck?.learners.map((learner, index) => {
                return (
                  <Learner
                    username={learner.username}
                    adnim={learner.username === data.deck?.creator.username}
                    deckStats={learner.deckStats}
                    me={learner.username === meQ?.me?.username}
                    key={index}
                  />
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Deck;

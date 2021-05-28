import {
  faEllipsisH,
  faPlay,
  faShareAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDeckQuery } from "../generated/graphql";
import { InlineEdit } from "./InlineEdit";
import { useUpdateDeckInfoMutation } from "../generated/graphql";
import { CardPreview } from "./CardPreview";
import Learner from "./Learner";
import CardEdit from "./CardEdit";

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
  const [{ data, fetching }] = useDeckQuery({ variables: { id: id } });

  const [bodyCards, setBodyCards] = useState(true);
  const [editCards, setEditCards] = useState(false);

  const [title, setTitle] = useState<inlineState>({ value: "", edit: false });
  const [desc, setDesc] = useState<inlineState>({ value: "", edit: false });
  const [creatorUsername, setCreatorUsername] = useState(String);

  useEffect(() => {
    if (data?.deck) {
      setTitle({ ...title, value: data.deck.title });
      setDesc({ ...desc, value: data.deck.description });
      setCreatorUsername(data.deck.creator.username);
    }
    setEditCards(false);
    setBodyCards(true);
  }, [data, fetching]);

  useEffect(() => {
    setEditCards(false);
  }, [bodyCards]);

  const updateTitle = (obj: inlineState) => {
    if (obj.update) {
      setTitle({ ...title, edit: obj.edit });
      update({ id: id, title: obj.value, description: desc.value });
    } else {
      setTitle(obj);
    }
  };

  const updateDesc = (obj: inlineState) => {
    if (obj.update) {
      setDesc({ ...desc, edit: obj.edit });
      update({ id: id, title: title.value, description: obj.value });
    } else {
      setDesc(obj);
    }
  };

  const handleAddClick = () => {
    setEditCards(true);
  };

  const handleEditDone = () => {
    setEditCards(false);
  };

  return (
    <div className="flex flex-col">
      {fetching ? (
        <div className="grid place-items-center h-screen w-full">
          <FontAwesomeIcon icon={faSpinner} spin size="5x" />
        </div>
      ) : data?.deck ? (
        <div className="p-8">
          <InlineEdit
            edit={title.edit}
            value={title.value}
            changeState={updateTitle}
          />
          <InlineEdit
            edit={desc.edit}
            value={desc.value}
            changeState={updateDesc}
          />
          <div className="flex mb-3">
            <div className="mr-2">Creator:</div>
            <div className="text-purple-700">{creatorUsername}</div>
          </div>
          <div className="flex justify-start">
            <div className="flex">
              <div
                title="Learn"
                className="w-8 h-8 bg-gray-300 grid place-items-center rounded-full cursor-pointer"
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
        <ul className="list-none flex bg-gray-300 font-semibold">
          <li
            className={`flex-1 grid place-items-center ${
              bodyCards ? "border-b-8" : "border-b-2"
            }  border-gray-500 py-2 cursor-pointer`}
            onClick={() => setBodyCards(true)}
          >
            <div>Cards</div>
          </li>
          <li
            className={`flex-1 grid place-items-center ${
              bodyCards ? "border-b-2" : "border-b-8"
            }  border-gray-500 py-2 cursor-pointer`}
            onClick={() => setBodyCards(false)}
          >
            <div>Learners ({data?.deck?.learners.length})</div>
          </li>
        </ul>
      </div>
      <div className="p-3 overflow-auto flex-1">
        {bodyCards ? (
          editCards ? (
            <CardEdit
              handleDone={handleEditDone}
              cards={data!.deck!.cards}
              deckId={id}
            />
          ) : data?.deck?.cards.length == 0 ? (
            <div>
              Your deck has no cards. Add cards to get started
              <span
                className="my-2 mx-3 cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
                onClick={handleAddClick}
              >
                Add Cards
              </span>
            </div>
          ) : (
            <>
              {data?.deck?.cards.map((card) => {
                return (
                  <CardPreview
                    id={card.id}
                    question={card.question}
                    answer={card.answer}
                    key={card.number}
                    number={card.number}
                  />
                );
              })}
              <span
                className="my-2 mx-3 cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
                onClick={handleAddClick}
              >
                Add Cards
              </span>
            </>
          )
        ) : (
          data?.deck?.learners.map((learner, index) => {
            return <Learner username={learner.username} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default Deck;

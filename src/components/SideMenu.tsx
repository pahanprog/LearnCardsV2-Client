import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDecksPreviewQuery, useMeQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import CreateDeckBtn from "./CreateDeckBtn";
import DeckSearchButton from "./DeckSearchButton";
import { SideDeck } from "./SideDeck";

interface SideMenuProps {
  changeDeck: Function;
}

const SideMenu: React.FC<SideMenuProps> = ({ changeDeck }) => {
  useIsAuth();

  const [{ data: me }] = useMeQuery();

  const [{ data }] = useDecksPreviewQuery();

  useEffect(() => {
    if (data?.decks?.length != 0 && data?.decks) {
      changeDeck(data?.decks[0].id);
    }
  }, [data]);

  return (
    <div className="max-w-xs w-full h-screen bg-gray-600 flex flex-col">
      <header className="flex justify-between items-center p-4">
        <div
          className="w-9 h-9 rounded-full bg-white cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        ></div>
        <div className="w-16 h-16 rounded-full bg-white grid place-items-center text text-3xl font-bold">
          {me?.me?.username.charAt(0).toUpperCase()}
        </div>
        <div className="w-9 h-9 rounded-full bg-white cursor-pointer grid place-items-center">
          <FontAwesomeIcon icon={faCog} size="lg" />
        </div>
      </header>
      <div className="w-full flex justify-between items-center mt-8 border-b-2 pb-2 border-gray-400 p-4">
        <div>My decks</div>
        <div className="flex">
          <CreateDeckBtn />
          <DeckSearchButton />
        </div>
      </div>
      <div className="w-full overflow-auto px-4">
        {data?.decks
          ? data.decks.map((deck) => {
              return (
                <SideDeck
                  changeDeck={changeDeck}
                  title={deck.title}
                  description={deck.description}
                  id={deck.id}
                  key={deck.id}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SideMenu;

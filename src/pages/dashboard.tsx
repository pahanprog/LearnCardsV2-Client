import React, { useEffect, useState } from "react";
import DeckComponent from "../components/Deck";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { useRouter } from "next/router";
import { DeckPreview, DeckPreviewContextType } from "../types";

export const DeckPreviewContext = React.createContext<DeckPreviewContextType>({
  decks: [],
  setDecks: () => {},
});

export default function dashboard() {
  const [deckId, setDeckId] = useState(-1);
  const [deckPreviews, setDeckPreviews] = useState<DeckPreview[]>([]);

  const router = useRouter();

  useEffect(() => {
    const id: number = +router.query.deck;
    if (id) {
      setDeckId(id);
    }
  }, [router.query.deck]);

  // useEffect(() => {
  //   const url = window.location.search;
  //   if (url) {
  //     const id: number = +url.split("=")[1];
  //     if (id) {
  //       setDeckId(id);
  //     }
  //   }
  // }, []);

  return (
    <DeckPreviewContext.Provider
      value={{
        decks: deckPreviews,
        setDecks: setDeckPreviews,
      }}
    >
      <div className="flex">
        <SideMenu deckId={deckId} decks={deckPreviews} />
        <div className="bg-white flex-1 grid grid-rows-auto-1 px-8 py-4">
          <Header />
          <DeckComponent id={deckId} />
        </div>
      </div>
    </DeckPreviewContext.Provider>
  );
}

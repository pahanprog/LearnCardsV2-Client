import React, { useEffect, useState } from "react";
import DeckComponent from "../components/Deck";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { useRouter } from "next/router";
import { DeckPreview, DeckPreviewContextType } from "../types";
import { useIsAuth } from "../utils/useIsAuth";
import { ResponsiveSideMenuProvider } from "../context/ResponsiveSideMenuProvider";

export const DeckPreviewContext = React.createContext<DeckPreviewContextType>({
  decks: [],
  setDecks: () => {},
});

export default function dashboard() {
  useIsAuth();
  const [deckId, setDeckId] = useState(-1);
  const [deckPreviews, setDeckPreviews] = useState<DeckPreview[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.deck) {
      const id: number = +router.query.deck;
      if (id) {
        setDeckId(id);
      }
    } else {
      setDeckId(-1);
    }
  }, [router.query]);

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
    <ResponsiveSideMenuProvider>
      <DeckPreviewContext.Provider
        value={{
          decks: deckPreviews,
          setDecks: setDeckPreviews,
        }}
      >
        <div className="flex">
          <SideMenu deckId={deckId} decks={deckPreviews} />
          <div className="bg-white flex-1 grid grid-rows-auto-1 py-2 md:py-4 flex flex-col overflow-y-hidden h-screen">
            <Header />
            <DeckComponent id={deckId} />
          </div>
        </div>
      </DeckPreviewContext.Provider>
    </ResponsiveSideMenuProvider>
  );
}

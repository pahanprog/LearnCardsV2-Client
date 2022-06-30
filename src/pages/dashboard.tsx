import React, { useContext, useEffect, useState } from "react";
import DeckComponent from "../components/Deck";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { useRouter } from "next/router";
import { DeckPreview, DeckPreviewContextType } from "../types";
import { useIsAuth } from "../utils/useIsAuth";
import { ResponsiveSideMenuProvider } from "../context/ResponsiveSideMenuProvider";

export default function dashboard() {
  useIsAuth();
  const [deckId, setDeckId] = useState(-1);

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
      <div className="flex w-full h-full">
        <SideMenu deckId={deckId} />
        <div className="bg-white flex-1 grid grid-rows-auto-1 py-2 md:py-4 flex flex-col overflow-y-hidden h-full">
          <Header />
          <DeckComponent id={deckId} />
        </div>
      </div>
    </ResponsiveSideMenuProvider>
  );
}

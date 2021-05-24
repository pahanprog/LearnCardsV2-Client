import React, { useState } from "react";
import Deck from "../components/Deck";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

export default function dashboard() {
  const [deckId, setDeckId] = useState(-1);

  return (
    <div className="flex">
      <SideMenu changeDeck={setDeckId} deckId={deckId} />
      <div className="bg-white flex-1 grid grid-rows-auto-1 px-8 py-4">
        <Header />
        <Deck id={deckId} />
      </div>
    </div>
  );
}

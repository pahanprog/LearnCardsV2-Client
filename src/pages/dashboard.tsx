import React, { useState } from "react";
import Deck from "../components/Deck";
import SideMenu from "../components/SideMenu";

export default function dashboard() {
  const [deckId, setDeckId] = useState(-1);

  return (
    <div className="flex">
      <SideMenu changeDeck={setDeckId} />
      <div className="bg-white flex-1">
        <Deck id={deckId} />
      </div>
    </div>
  );
}

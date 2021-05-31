import React, { useEffect, useState } from "react";
import Deck from "../components/Deck";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { useRouter } from "next/router";

export default function dashboard() {
  const [deckId, setDeckId] = useState(-1);

  const router = useRouter();

  useEffect(() => {
    const id: number = +router.query.deck;
    if (id) {
      setDeckId(id);
    }
  }, [router.query.deck]);

  return (
    <div className="flex">
      <SideMenu deckId={deckId} />
      <div className="bg-white flex-1 grid grid-rows-auto-1 px-8 py-4">
        <Header />
        <Deck id={deckId} />
      </div>
    </div>
  );
}

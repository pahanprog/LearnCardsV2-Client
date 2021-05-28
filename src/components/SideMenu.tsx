import React, { useEffect, useState } from "react";
import { useDecksPreviewQuery, useMeQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import CreateDeckBtn from "./CreateDeckBtn";
import DashboardLink from "./DashboardLink";
import { SideDeck } from "./SideDeck";
import { useRouter } from "next/router";

interface SideMenuProps {
  deckId: number;
}

const SideMenu: React.FC<SideMenuProps> = ({ deckId }) => {
  useIsAuth();

  const [{ data: me }] = useMeQuery();

  const [{ data }] = useDecksPreviewQuery();

  const [edit, setEdit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (data?.decks?.length != 0 && data?.decks) {
      router.replace(`/dashboard?deck=${data.decks[0].id}`, undefined, {
        shallow: true,
      });
    }
  }, [data]);

  return (
    <div className="max-w-xs w-full h-screen bg-gray-100 flex flex-col text-gray-600 text-xl">
      <header className="flex justify-between items-center p-4 pb-0">
        <div
          className="text-3xl font-semibold cursor-pointer text-gray-800"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Learn Cards
        </div>
      </header>
      <div className="w-full flex flex-col justify-between p-4 border-b mt-3">
        <div className="">
          <DashboardLink type="Discover" />
          <DashboardLink type="Stats" />
        </div>
      </div>
      <div className="w-full flex justify-between items-center border-b p-4">
        <div>Decks</div>
        <div>
          <div className="cursor-pointer" onClick={() => setEdit(!edit)}>
            Edit
          </div>
        </div>
      </div>
      <div className="w-full overflow-auto">
        {data?.decks
          ? data.decks.map((deck) => {
              if (deck.id == deckId) {
                return (
                  <SideDeck
                    title={deck.title}
                    description={deck.description}
                    id={deck.id}
                    key={deck.id}
                    selected
                  />
                );
              } else {
                return (
                  <SideDeck
                    title={deck.title}
                    description={deck.description}
                    id={deck.id}
                    key={deck.id}
                  />
                );
              }
            })
          : null}
        {edit ? <CreateDeckBtn /> : null}
      </div>
    </div>
  );
};

export default SideMenu;

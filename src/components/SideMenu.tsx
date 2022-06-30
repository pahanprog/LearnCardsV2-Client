import React, { useContext, useEffect, useState } from "react";
import { Deck, useDecksPreviewQuery, useMeQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import CreateDeckBtn from "./CreateDeckBtn";
import DashboardLink from "./DashboardLink";
import { SideDeck } from "./SideDeck";
import { useRouter } from "next/router";
import { DeckPreview } from "../types";
import { Button } from "./Button";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { ResponsiveSideMenuContext } from "../context/ResponsiveSideMenuProvider";

interface SideMenuProps {
  deckId: number;
  hidden?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ deckId }) => {
  const [{ data }] = useDecksPreviewQuery({
    requestPolicy: "network-only",
  });
  const { menuOpen, toggleMenu } = useContext(ResponsiveSideMenuContext);

  const [edit, setEdit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log("DATA CHANGED ", data);
    if (data?.decks?.length != 0 && data?.decks) {
      if (data.decks[0] && data.decks[0].id) {
        router.replace(`/dashboard?deck=${data.decks[0].id}`, undefined, {
          shallow: true,
        });
      } else {
        router.replace(`/dashboard`, undefined, { shallow: true });
      }
    } else if (data?.decks?.length === 0) {
      router.replace(`/dashboard`, undefined, { shallow: true });
    }
  }, [data]);

  const { height, width } = useWindowDimensions();

  // useEffect(() => {
  //   if (width >= 768 && !menuOpen) {
  //     toggleMenu();
  //   }
  // }, [width]);

  const [styles, setStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (width < 768) {
      setStyles({
        transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "all 300ms",
        zIndex: 1000,
      });
    } else {
      setStyles({ transform: "translateX(0)" });
    }
  }, [width, menuOpen]);

  return (
    <div
      style={styles}
      className="transition-transform absolute md:relative max-w-xs w-full h-full bg-gray-100 flex flex-col text-gray-600 text-xl translate-x-full"
    >
      <header className="flex justify-between items-center p-4 pb-0">
        <div className="flex flex-row w-full items-center">
          <div
            className="md:hidden mr-auto p-2"
            onClick={() => {
              toggleMenu();
            }}
          >
            <div
              style={{ transform: "rotate(45deg) translateY(4px)" }}
              className="w-6 bg-black h-0.5 rounded"
            />
            <div
              style={{ transform: "rotate(-45deg) translateY(-4px)" }}
              className="w-6 bg-black h-0.5 rounded mt-1"
            />
          </div>
          <div
            className="ml-auto md:ml-0 text-3xl font-semibold cursor-pointer text-gray-800"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Learn Cards
          </div>
        </div>
      </header>
      <div className="w-full flex flex-col pt-4 pb-4 border-b mt-3">
        <DashboardLink type="Поиск колод" />
        <DashboardLink type="Актуальные колоды" />
        <DashboardLink type="Общая статистика" />
      </div>
      <div className="w-full flex justify-between items-center border-b p-4">
        <div>Колоды</div>
        <div>
          <Button type="s" title="Изменить" onClick={() => setEdit(!edit)} />
        </div>
      </div>
      <div className="w-full overflow-auto">
        {data?.decks
          ? data?.decks.map((deck) => {
              if (deck !== null) {
                return (
                  <SideDeck
                    title={deck.title}
                    description={deck.description}
                    id={deck.id}
                    key={deck.id}
                    edit={edit}
                    isLearner={deck.isLearner}
                    selected={deck.id == deckId}
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

SideMenu.defaultProps = {
  hidden: false,
};

export default SideMenu;

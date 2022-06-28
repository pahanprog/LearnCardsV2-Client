import React, { useEffect } from "react";
import {
  useDeckSearchQuery,
  useStartLearningMutation,
} from "../generated/graphql";
import { Button } from "./Button";

interface SearchResultProps {
  keywords: string;
}

export const SearchResult = ({ keywords }: SearchResultProps) => {
  const [{ data, fetching, error }] = useDeckSearchQuery({
    variables: { title: keywords },
  });
  const [{}, startLearning] = useStartLearningMutation();

  useEffect(() => {
    if (error) {
      alert(`Ошибка при обработке запроса ${error.message}`);
    }
  }, [fetching]);

  if (keywords === "") {
    return (
      <div className="flex-1 grid place-items-center">
        <div className="px-4 text-lg">
          Введите ключевые слова в форму выше чтобы найти нужную вам колоду.
        </div>
      </div>
    );
  }

  return (
    <>
      {data?.deckSearch?.length === 0 ? (
        <div className="flex-1 grid place-items-center">
          <div className="px-4 text-lg">
            По данным ключевым словам не было найдено ни одной колоды
          </div>
        </div>
      ) : (
        <div className="flex-1 md:p-6 p-4">
          {data?.deckSearch?.map((deck) => {
            return (
              <div
                key={deck.id}
                className="mb-4 relative p-4 w-full bg-white border shadow-sm h-min rounded-xl flex flex-col md:flex-row justify-between"
              >
                <div className="h-full flex flex-col justify-center">
                  <div className="text-lg font-semibold">{deck.title}</div>
                  <div className="text-base md:mt-0 mt-0.5">
                    {deck.description}
                  </div>
                  <div className="text-base flex md:mt-0 mt-0.5">
                    Создатель:
                    <div className="text-base text-purple-700 ml-2">
                      {deck.creator.username}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center md:items-end md:mt-0 mt-2">
                  <div className="text-sm">
                    уникальных карточек: {deck.cards.length}
                  </div>
                  <div className="text-sm">
                    студентов: {deck.learners.length}
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "rgba(156, 163, 175, 0.5)" }}
                  className="absolute left-0 top-0 w-full h-full z-10 rounded-xl grid place-items-center opacity-0 hover:opacity-100"
                >
                  <Button
                    title="Добавить колоду"
                    onClick={async () => {
                      const result = await startLearning({ id: deck.id });
                      if (result.error) {
                        alert(
                          `Ошибка при попытке добавить колоду в ваш списко ${result.error}`
                        );
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

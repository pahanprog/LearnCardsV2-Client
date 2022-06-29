import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { TextInput } from "../components/TextInput";
import {
  useDiscoverQuery,
  useStartLearningMutation,
} from "../generated/graphql";

export default function discover() {
  const [{ data, fetching, error }] = useDiscoverQuery();
  const [{}, startLearning] = useStartLearningMutation();

  useEffect(() => {
    if (error) {
      alert(`Ошибка при запросе актуальный колод ${error}`);
    }
  }, [fetching]);

  return (
    <div className="w-full h-full flex flex-col">
      <Header showLogo />
      <div className="flex-1 bg-gray-100 flex flex-col overflow-y-scroll">
        <div className="flex-1 p-6 ">
          <div className="text-center text-2xl mb-6">Актуальный колоды</div>
          {data?.discover?.map((deck) => {
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
      </div>
    </div>
  );
}

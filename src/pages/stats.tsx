import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { TextInput } from "../components/TextInput";
import { useGetStatsQuery } from "../generated/graphql";

export default function stats() {
  const [{ data, fetching, error }] = useGetStatsQuery({
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      alert(`Ошибка при загрузке данных ${error}`);
    }
  }, [fetching]);

  const [createdDecks, setCreatedDecks] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      <Header showLogo />
      <div className="flex-1 bg-gray-100 flex flex-col py-6">
        <div className="px-6 mb-6">
          <div className="text-base">
            Всего карточек в ваших колодах: {data?.getStats?.overallCards}
          </div>
          <div>Всего изученых карточек: {data?.getStats?.learnedCards}</div>
          <div>Всего созданных колод: {data?.getStats?.createdDecks}</div>
          <div>
            Всего студентов в созданных вами колодах:{" "}
            {data?.getStats?.studentsInCreatedDecks}
          </div>
          <div>
            Всего вами изучено: {data?.getStats?.overallLearnedPercent}%
          </div>
          <div>
            Вы знаете карточки, которые повторяли на:{" "}
            {data?.getStats?.learnedPercent}%
          </div>
        </div>
        <div>
          <ul className="border-b-2 border-gray-500 flex mb-4 list-none flex bg-gray-300 font-semibold">
            <li
              className={`flex-1 grid place-items-center border-b-4 ${
                createdDecks ? "border-gray-300" : "border-gray-500"
              } py-2 px-2 text-center`}
              onClick={() => setCreatedDecks(false)}
            >
              Колоды, которые вы узучаете (
              {data?.getStats?.learningDecksArray.length})
            </li>
            <li
              className={`flex-1 grid place-items-center border-b-4 ${
                createdDecks ? "border-gray-500" : "border-gray-300"
              } py-2 px-2 text-center`}
              onClick={() => setCreatedDecks(true)}
            >
              Колоды, которые вы создали (
              {data?.getStats?.createdDecksArray.length})
            </li>
          </ul>
          <div className="px-6">
            {createdDecks ? (
              <>
                {data?.getStats?.createdDecksArray.map((deck) => {
                  return (
                    <div
                      key={deck.id}
                      className="mb-4 relative p-4 w-full bg-white border shadow-sm h-min rounded-xl flex flex-col md:flex-row justify-between"
                    >
                      <div className="h-full flex flex-col justify-center">
                        <div className="text-lg font-semibold">
                          {deck.title}
                        </div>
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
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {data?.getStats?.learningDecksArray.map((deck) => {
                  return (
                    <div
                      key={deck.id}
                      className="mb-4 relative p-4 w-full bg-white border shadow-sm h-min rounded-xl flex flex-col md:flex-row justify-between"
                    >
                      <div className="h-full flex flex-col justify-center">
                        <div className="text-lg font-semibold">
                          {deck.title}
                        </div>
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
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React from "react";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { TextInput } from "../components/TextInput";

export default function stats() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header showLogo />
      <div className="flex-1 bg-gray-100 flex flex-col py-6">
        <div className="px-6 mb-6">
          <div>Всего карточек в ваших колодах: 83</div>
          <div>Всего изученых карточек: 2</div>
          <div>Всего созданных колод: 1</div>
          <div>Всего студентов в созданных вами колодах: 1</div>
          <div>Всего вами изучено: 0.025%</div>
          <div>Вы знаете карточки, которые повторяли на: 70%</div>
        </div>
        <div>
          <ul className="border-b-2 border-gray-500 flex mb-4 list-none flex bg-gray-300 font-semibold">
            <li className="flex-1 grid place-items-center border-b-4 border-gray-500 py-2">
              Колоды, которые вы узучаете (1)
            </li>
            <li className="flex-1 grid place-items-center border-b-4 border-gray-300 py-2">
              Колоды, которые вы создали (1)
            </li>
          </ul>
          <div className="px-6">
            {/* <div className="relative p-4 w-full bg-white border shadow-sm h-min rounded-xl flex justify-between">
              <div className="h-full flex flex-col justify-center">
                <div className="text-md">Английский язык</div>
                <div className="text-md">
                  Колода предназначенная для увеличения словарного запаса
                </div>
                <div className="text-md flex">
                  Создатель:
                  <div className="text-md text-purple-700 ml-2">Pavel L</div>
                </div>
              </div>
              <div className=" flex flex-col justify-center items-end">
                <div className="text-sm">уникальных карточек: 2</div>
                <div className="text-sm">студентов: 1</div>
              </div>
            </div> */}
            <div className="relative p-4 w-full bg-white border shadow-sm h-min rounded-xl flex flex-col md:flex-row justify-between">
              <div className="h-full flex flex-col justify-center">
                <div className="text-lg font-semibold">Таблица умножений</div>
                <div className="text-base md:mt-0 mt-0.5">
                  Колода поможет быстрее выучить таблицу умножений
                </div>
                <div className="text-base flex md:mt-0 mt-0.5">
                  Создатель:
                  <div className="text-base text-purple-700 ml-2">Iluyuaaa</div>
                </div>
              </div>
              <div className=" flex flex-col justify-center md:items-end md:mt-0 mt-2">
                <div className="text-sm">уникальных карточек: 81</div>
                <div className="text-sm">студентов: 10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

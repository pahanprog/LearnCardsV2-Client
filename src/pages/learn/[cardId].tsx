import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionProvider";
import { useGetCardFromSessionQuery } from "../../generated/graphql";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Learn: NextPage<{ cardId: string }> = ({ cardId }: any) => {
  const { sessionId, savePerformanceRating, currentCardId } =
    useContext(SessionContext);
  const [{ data, fetching, error }] = useGetCardFromSessionQuery({
    requestPolicy: "network-only",
    variables: { cardId: parseInt(cardId), sessionId },
  });
  const router = useRouter();

  const [flipped, setFlipped] = useState(false);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (sessionId === 0) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden bg-gray-100 overflow-scroll">
      <div
        className="w-11/12 h-4/6 mb-4 cursor-pointer"
        onClick={() => {
          setFlipped(!flipped);
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
            transition: "transform .5s ease",
          }}
          className="relative w-full h-full bg-white border shadow-md rounded-xl grid place-items-center p-4"
        >
          <div
            style={{ backfaceVisibility: "hidden", transform: "rotateY(0)" }}
            className="w-full h-full absolute top-0 left-0"
          >
            <div className="w-full h-full relative grid place-items-center">
              <div className="absolute text-md left-4 top-4 ">Вопрос</div>
              <div className="md:text-2xl text-xl">
                {data?.getCardFromSession?.question}
              </div>
            </div>
          </div>
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="w-full h-full absolute top-0 left-0"
          >
            <div className="w-full h-full relative grid place-items-center">
              <div className="absolute text-md left-4 top-4">Ответ</div>
              <div className="text-2xl">{data?.getCardFromSession?.answer}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 flex flex-col mx-auto">
        {flipped ? (
          <>
            <div className="text-md md:text-xl self-center mb-4">
              Как хорошо вы знаете это?
            </div>
            <div className="flex flex-1">
              <div
                onClick={() => {
                  savePerformanceRating(0);
                  setFlipped(false);
                }}
                className="relative flex-col flex-1 bg-red-700 text-xl text-white flex justify-center items-center p-2 md:p-4"
              >
                <div className="mb-auto text-xl font-semibold">0</div>
                {width >= 640 ? (
                  <div className="text-xs md:text-md text-center">
                    Ничего не вспомнили
                  </div>
                ) : null}
              </div>
              <div
                onClick={() => {
                  savePerformanceRating(0.2);
                  setFlipped(false);
                }}
                className="relative flex-col flex-1 bg-red-500 text-xl text-white flex justify-center items-center p-2 md:p-4"
              >
                <div className="mb-auto text-xl font-semibold">1</div>
                {width >= 640 ? (
                  <div className="text-xs md:text-base text-center">
                    Вспомнили когда перевернули
                  </div>
                ) : null}
              </div>
              <div
                onClick={() => {
                  savePerformanceRating(0.4);
                  setFlipped(false);
                }}
                className="relative flex-col flex-1 bg-red-300 text-xl text-white flex justify-center items-center p-2 md:p-4"
              >
                <div className="mb-auto text-xl font-semibold">2</div>
                {width >= 640 ? (
                  <div className="text-xs md:text-base text-center">
                    Казалось что легко вспомнить
                  </div>
                ) : null}
              </div>
              <div
                onClick={() => {
                  savePerformanceRating(0.6);
                  setFlipped(false);
                }}
                className="relative flex-col flex-1 bg-gray-400 text-xl text-white flex justify-center items-center p-2 md:p-4"
              >
                <div className="mb-auto text-xl font-semibold">3</div>
                {width >= 640 ? (
                  <div className="text-xs md:text-base text-center">
                    Пришлось сильно задуматься
                  </div>
                ) : null}
              </div>
              <div
                onClick={() => {
                  savePerformanceRating(0.8);
                  setFlipped(false);
                }}
                className="relative flex-col flex-1 bg-green-500 text-xl text-white  flex justify-center items-center p-2 md:p-4"
              >
                <div className="mb-auto text-xl font-semibold">4</div>
                {width >= 640 ? (
                  <div className="text-xs md:text-base text-center">
                    Пришлось немного подумать
                  </div>
                ) : null}
              </div>
              <div
                onClick={() => {
                  savePerformanceRating(1);
                  setFlipped(false);
                }}
                className="relative flex-col flex-1 bg-green-700 text-xl text-white  flex justify-center items-center p-2 md:p-4"
              >
                <div className="mb-auto text-xl font-semibold">5</div>
                {width >= 640 ? (
                  <div className="text-xs md:text-base text-center">
                    Сразу вспомнили
                  </div>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <div
            className="p-4 w-full text-blue-900 bg-blue-200 hover:bg-blue-300 rounded-lg flex justify-center cursor-pointer"
            onClick={() => {
              setFlipped(!flipped);
            }}
          >
            <div className="text-xl md:text-2xl">Показать ответ</div>
          </div>
        )}
      </div>
    </div>
  );
};

Learn.getInitialProps = ({ query }: any) => {
  console.log("QUERY ", query);
  return {
    cardId: query.cardId as string,
  };
};

export default Learn;

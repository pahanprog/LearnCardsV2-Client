import { useRouter } from "next/router";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useCalculateStatsMutation } from "../generated/graphql";

export const SessionContext = createContext<{
  sessionId: number;
  currentCardId: number;
  //   showNextCard: () => void;
  savePerformanceRating: (rating: number) => void;
  setSessionId: (id: number) => void;
  setSessionCards: (cards: number[]) => void;
  setCurrentCardId: (id: number) => void;
}>({
  sessionId: 0,
  currentCardId: 0,
  //   showNextCard: () => {},
  savePerformanceRating: () => {},
  setSessionId: () => {},
  setSessionCards: () => {},
  setCurrentCardId: () => {},
});

export const SessionProvider: React.FC = ({ children }) => {
  const [{}, calculate] = useCalculateStatsMutation();
  const router = useRouter();

  const [sessionId, setSessionId] = useState(0);
  const [sessionCards, setSessionCards] = useState<number[]>([]);
  const [currentCardId, setCurrentCardId] = useState(0);

  const currentCardIndex = useRef(0);

  const savePerformanceRating = async (performanceRating: number) => {
    const result = await calculate({
      cardId: currentCardId,
      performanceRating,
      sessionId: sessionId,
    });

    console.log("RESULT ", result);

    if (result.data?.calculateStats?.id) {
      console.log("CHECKED ");
      if (sessionCards[currentCardIndex.current + 1]) {
        currentCardIndex.current = currentCardIndex.current + 1;
        setCurrentCardId(sessionCards[currentCardIndex.current]);
        console.log(
          "SHOULD SHOW NEXT ",
          sessionCards[currentCardIndex.current]
        );
        router.replace(
          `/learn/${sessionCards[currentCardIndex.current]}`,
          undefined
        );
      } else {
        console.log("SHOULD GOT TO DASHBOARD ");
        setSessionId(0);
        setSessionCards([]);
        setCurrentCardId(0);
        currentCardIndex.current = 0;
        router.replace(`/dashboard`, undefined);
      }
    }
  };

  useEffect(() => {
    console.log("sessionId changed ", sessionId);
  }, [sessionId]);

  useEffect(() => {
    console.log("sessionCards changed ", sessionCards);
  }, [sessionCards]);

  useEffect(() => {
    console.log("currentCardId changed ", sessionCards);
  }, [currentCardId]);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        currentCardId,
        savePerformanceRating,
        setSessionCards,
        setCurrentCardId,
        setSessionId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

import { authExchange } from "@urql/exchange-auth";
import React, { createContext, useEffect, useState } from "react";
import {
  Client,
  createClient,
  fetchExchange,
  makeOperation,
  Provider,
} from "urql";
import { __prod__ } from "../constants";
import { cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { DecksPreviewDocument } from "../generated/graphql";

export const UrqlClientContext = createContext<{
  resetClient: () => void;
}>({
  resetClient: () => {},
});

export const UrqlClientProvider: React.FC = ({ children }) => {
  const willAuthError = ({ authState }: any) => {
    // console.log("Will error");
    if (!authState) return true;
    return false;
  };

  const didAuthError = ({ error, authState }: any) => {
    // console.log("Did error");
    return true;
  };

  const getAuth = async ({ authState }: any) => {
    if (!authState && typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      console.log(user);
      if (user) {
        const values: { token: string } = JSON.parse(user);
        const token = values?.token;
        console.log("Get Auth token ", token);
        return { token };
      }
      return null;
    }

    return null;
  };

  const addAuthToOperation = ({ authState, operation }: any) => {
    if (!authState || !authState.token) {
      return operation;
    }

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      },
    });
  };

  const makeClient = () =>
    createClient({
      url: __prod__
        ? "https://learncardsv2-api.herokuapp.com/graphql"
        : "http://localhost:5000/graphql",
      fetchOptions: {
        credentials: "include",
      },
      exchanges: [
        cacheExchange({
          updates: {
            Mutation: {
              deleteDeck: (result, variables, cache, info) => {
                cache.invalidate({
                  __typename: "Deck",
                  id: variables.id as number,
                });
              },
              startLearning: (result, variables, cache, info) => {
                const input: QueryInput = {
                  query: DecksPreviewDocument,
                  variables: {},
                };
                cache.updateQuery(input, (data) => {
                  if (!data || !data.decks) {
                    return data;
                  }
                  const array = data.decks as Array<{
                    id: number;
                    title: string;
                    description: string;
                    isLearner: boolean;
                  }>;
                  const newDeck = result.startLearning as {
                    id: number;
                    title: string;
                    description: string;
                    isLearner: boolean;
                  };
                  data.decks = [newDeck].concat(array);
                  return data;
                });
              },
              createDeck: (result, variables, cache, info) => {
                const input: QueryInput = {
                  query: DecksPreviewDocument,
                  variables: {},
                };
                cache.updateQuery(input, (data) => {
                  if (!data || !data.decks) {
                    return data;
                  }
                  const array = data.decks as Array<{
                    id: number;
                    title: string;
                    description: string;
                    isLearner: boolean;
                  }>;
                  const newDeck = result.createDeck as {
                    id: number;
                    title: string;
                    description: string;
                    isLearner: boolean;
                  };
                  data.decks = array.push(newDeck);
                  return data;
                });
              },
              updateDeckInfo: (result: any, variables, cache, info) => {
                const input: QueryInput = {
                  query: DecksPreviewDocument,
                  variables: {},
                };
                cache.updateQuery(input, (data) => {
                  if (!data || !data.decks || !result) {
                    return data;
                  }
                  const array = data.decks as Array<{
                    id: number;
                    title: string;
                    description: string;
                    isLearner: boolean;
                  }>;
                  const newArray = array.map((deck) => {
                    if (deck.id === variables.id) {
                      deck.description = result.updateDeckInfo.description;
                      deck.title = result.updateDeckInfo.title;
                    }
                    return deck;
                  });
                  data.decks = newArray;
                  return data;
                });
              },
            },
          },
        }),
        authExchange({
          getAuth,
          addAuthToOperation,
          willAuthError,
          didAuthError,
        }),
        fetchExchange,
      ],
    });

  const [client, setClient] = useState<Client>(makeClient());

  useEffect(() => {
    console.log("URQL client changed");
  }, [client]);

  return (
    <UrqlClientContext.Provider
      value={{
        resetClient: () => {
          setClient(makeClient());
        },
      }}
    >
      <Provider value={client}>{children}</Provider>
    </UrqlClientContext.Provider>
  );
};

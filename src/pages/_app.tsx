import "../assets/css/tailwind.output.css";
import { createClient } from "@urql/core";
import type { AppProps } from "next/app";
import { fetchExchange, makeOperation, Provider } from "urql";
import { __prod__ } from "../constants";
import { authExchange } from "@urql/exchange-auth";
import axios from "axios";
import { cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { DecksPreviewDocument } from "../generated/graphql";
import { SessionProvider } from "../context/SessionProvider";

let client: any;

axios.defaults.baseURL = __prod__
  ? "https://learncardsv2-api.herokuapp.com"
  : "http://localhost:5000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

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

try {
  client = createClient({
    url: "http://localhost:5000/graphql",
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
} catch (e) {
  console.error(e);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

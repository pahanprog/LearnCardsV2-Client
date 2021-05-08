import { createClient } from "@urql/core";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import "../assets/css/tailwind.output.css";
import { __prod__ } from "../constants";

const client = createClient({
  url: __prod__ ? process.env.API_URL! : "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

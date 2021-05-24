import { createClient } from "@urql/core";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import "../assets/css/tailwind.output.css";
import { __prod__ } from "../constants";

let client: any;

try {
  client = createClient({
    url: process.env.API_URL!,
    fetchOptions: {
      credentials: "include",
    },
  });
} catch (e) {
  console.error(e);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

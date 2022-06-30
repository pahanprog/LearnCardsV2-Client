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
import React, { useState } from "react";
import { DeckPreview, DeckPreviewContextType } from "../types";
import { UrqlClientProvider } from "../context/UrqlClientProvider";

let client: any;

axios.defaults.baseURL = __prod__
  ? "https://learncardsv2-api.herokuapp.com"
  : "http://localhost:5000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UrqlClientProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </UrqlClientProvider>
  );
}

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

import App from "./App";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  cache: cache,
  link: httpLink,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

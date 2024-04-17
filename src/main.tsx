import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AuthProvider from "./providers/AuthProvider.tsx";
import AuthHelper from "./utils/helpers/auth.helper.ts";

const { fetchFromLocalStorage } = AuthHelper;

const httpLink: ApolloLink = createHttpLink({
  uri: import.meta.env.VITE_SERVER_URL,
});

const authLink: ApolloLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = fetchFromLocalStorage("userToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import { loadDevTools } from "./dev-tools/load";
import "./bootstrap";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryConfigProvider } from "react-query";
import { App } from "./app";

// ignore the rootRef in this file. I'm just doing it here to make
// the tests I write to check your work easier.
export const rootRef = {};

const queryConfig = {
  queries: {
    /* your global query config */
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  },
};

loadDevTools(() => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>
  );
  rootRef.current = root;
});
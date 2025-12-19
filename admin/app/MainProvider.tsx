"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import QueryClientComponent from "@/components/query-client-component";
export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientComponent>{children}</QueryClientComponent>
    </Provider>
  );
}

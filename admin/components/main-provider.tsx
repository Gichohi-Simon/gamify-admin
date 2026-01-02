"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import QueryClientComponent from "@/components/query-client-component";
import { Toaster } from "./ui/sonner";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors closeButton />
      <QueryClientComponent>{children}</QueryClientComponent>
    </Provider>
  );
}

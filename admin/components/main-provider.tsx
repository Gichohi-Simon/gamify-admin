"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import QueryClientComponent from "@/components/query-client-component";
import { Toaster } from "./ui/sonner";
import AuthProvider from "./auth-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleClientId!}>
        <QueryClientComponent>
          <Toaster position="top-right" richColors closeButton />
          <AuthProvider />
          {children}
        </QueryClientComponent>
      </GoogleOAuthProvider>
    </Provider>
  );
}

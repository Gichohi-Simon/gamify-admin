import { loginInitialValues } from "../../types/types";
import { fetchJson } from "./fetchJson";
const API = process.env.NEXT_PUBLIC_API_URL;

export const adminSignIn = (values: loginInitialValues) => {
  return fetchJson<{ user: any }>(`${API}/auth/admin-login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });
};

export const signOut = () => {
  return fetchJson<{ message: string }>(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const checkAuth = () => {
  return fetchJson<{ user: any }>(`${API}/auth/check`, {
    credentials: "include",
  });
};

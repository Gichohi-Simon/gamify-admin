import {
  loginInitialValues,
  initialFormValuesInterface,
} from "../../types/types";
const API = process.env.NEXT_PUBLIC_API_URL;

export const signIn = async (values: loginInitialValues) => {
  const response = await fetch(`${API}/auth/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("error signing in");
  return response.json();
};

export const signUp = async (values: initialFormValuesInterface) => {
  const response = await fetch(`${API}/auth/sign-up`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("error signing up");
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) throw new Error("logout failed");
  return response.json();
};

export const checkAuth = async () => {
  const response = await fetch(`${API}/auth/check`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("error checking if user is authtenticated");
  return response.json();
};

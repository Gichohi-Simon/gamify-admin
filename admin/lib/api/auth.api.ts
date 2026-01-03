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

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error signing in");
  }
  return data;
};

export const signUp = async (values: initialFormValuesInterface) => {
  const response = await fetch(`${API}/auth/sign-up`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error signing up");
  }
  return data;
};

export const signOut = async () => {
  const response = await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "logout failed");
  }
  return data;
};

export const checkAuth = async () => {
  const response = await fetch(`${API}/auth/check`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error checking if user is authtenticated");
  }
  return data;
};

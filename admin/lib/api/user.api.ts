import { UserData } from "../../types/types";
const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (): Promise<UserData[]> => {
  const response = await fetch(`${API}/users/allUsers`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("failed to fetch users");
  const data = await response.json();
  return data;
};

import { UserData } from "../../types/types";
const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (): Promise<UserData[]> => {
  const response = await fetch(`${API}/users/allUsers`, {
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "failed to fetch users");
  }
  const data: { users: UserData[] } = await response.json();
  return data.users;
};

export const getSingleUserById = async (id: string): Promise<UserData> => {
  const response = await fetch(`${API}/users/single-user/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "failed to fetch user");
  }
  const data: { user: UserData } = await response.json();
  return data.user;
};

export const getBannedUsers = async (): Promise<UserData[]> => {
  const response = await fetch(`${API}/users/getDeletedAccounts`, {
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to fetch banned users",
    );
  }
  const data: { deletedAccounts: UserData[] } = await response.json();
  return data.deletedAccounts;
};

export const banUserFromPlatform = async (id: string): Promise<UserData> => {
  const response = await fetch(`${API}/users/ban-user-from-platform/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "failed to ban user");
  }
  const data: { deletedUser: UserData } = await response.json();
  return data.deletedUser;
};

export const restoreBannedUser = async (id: string): Promise<UserData> => {
  const response = await fetch(`${API}/users/ban-user-from-platform/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "failed to restore user");
  }
  const data: { restoredAccount: UserData } = await response.json();
  return data.restoredAccount;
};

export const makeUserAnAdmin = async (id: string): Promise<UserData> => {
  const response = await fetch(`${API}/users/makeAdmin/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to make user an admin",
    );
  }
  const data: { user: UserData } = await response.json();
  return data.user;
};

export const revokeUserAdminPriviledge = async (
  id: string,
): Promise<UserData> => {
  const response = await fetch(`${API}/users/removeAdmin/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to remove user as an admin",
    );
  }
  const data: { user: UserData } = await response.json();
  return data.user;
};

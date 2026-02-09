import { UserData, SingleUser } from "../../types/types";
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

export const getSingleUserById = async (
  id: string,
): Promise<{ user: SingleUser }> => {
  const response = await fetch(`${API}/users/single-user/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "failed to fetch user");
  }
  const data = await response.json();
  return data;
};

export const getTotalUsers = async (): Promise<number> => {
  const response = await fetch(`${API}/users/get-total-users`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to get total users",
    );
  }
  const data: { totalUsers: number } = await response.json();
  return data.totalUsers;
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
  const response = await fetch(
    `${API}/users/restore-banned-user-to-platform/${id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    },
  );
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

export const makeUserAnEmployee = async (id: string): Promise<UserData> => {
  const response = await fetch(`${API}/users/makeEmployee/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to make user an employee",
    );
  }
  const data: { user: UserData } = await response.json();
  return data.user;
};

export const removeUserAsAnEmployee = async (id: string): Promise<UserData> => {
  const response = await fetch(`${API}/users/removeEmployee/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to remove user as an employee",
    );
  }
  const data: { user: UserData } = await response.json();
  return data.user;
};

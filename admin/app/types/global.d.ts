declare module "*.css";

interface userState {
  id: string;
  email: string;
  username: string;
  password: string;
}

interface AuthState {
  userInfo: userState | null;
  initialized: boolean;
}

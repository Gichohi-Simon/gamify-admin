export interface initialFormValuesInterface {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface loginInitialValues {
  email: string;
  password: string;
}

export interface userState {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface AuthState {
  userInfo: userState | null;
  initialized: boolean;
}

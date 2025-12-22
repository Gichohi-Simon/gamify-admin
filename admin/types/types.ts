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

export interface UserData {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  isActive: boolean;
}

export interface ProductInterface {
  id: string;
  name: string;
  price: number;
  images: string[];
  createdAt: string;
  cloudinary_id: string;
  description: string;
  category: string;
}

export interface ProductResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  products: ProductInterface[];
}

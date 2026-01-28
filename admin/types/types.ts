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

export interface DeliveryAddress {
  id: string;
  companyName: string;
  street: string;
  floorNumber: string | null;
  city: string | null;
  postalCode: string;
  phoneNumber: string | null;
  userId: string;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  isActive: boolean;
  isBanned: boolean;
}

export interface SingleUser extends UserData {
  deliveryAddress: DeliveryAddress | null;
}

export interface GetSingleUserResponse {
  user: SingleUser;
}

export interface ProductInterface {
  id: string;
  name: string;
  price: number;
  images: string[];
  createdAt: string;
  cloudinary_ids: string[];
  description: string;
  category: string;
  isActive: boolean;
}

export interface ProductResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  products: ProductInterface[];
}

export interface OrderInterface {
  id: string;
  userId: string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  isPaid: boolean;
  paidAt: string | null;
  isDelivered: boolean;
  deliveredAt: string | null;
  invoiceNumber: string | null;
  createdAt: string;
}

export interface OrderItemProduct {
  name: string;
  images: string[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  product: OrderItemProduct;
}

export interface OrderUser {
  id: string;
  username: string;
  email: string;
  deliveryAddress: DeliveryAddress | null;
}

export interface Order {
  id: string;
  userId: string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  isPaid: boolean;
  paidAt: string | null;
  isDelivered: boolean;
  deliveredAt: string | null;
  invoiceNumber: string;
  createdAt: string;
  orderItems?: OrderItem[];
  user: OrderUser;
}

export interface CreateProductFormValues {
  name: string;
  price: string;
  description: string;
  category: string;
  images: File[];
}

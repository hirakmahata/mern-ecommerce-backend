import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}

export interface NewProductRequestBody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
}

export type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
  userId?: string;
  orderId?: string;
  productId?: string | string[];
};

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}

// interface ShippingInfo {
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   pinCode: number;
// }

// interface OrderItem {
//   name: string;
//   photo: string;
//   price: number;
//   quantity: number;
//   productId: Types.ObjectId;
// }

// export interface OrderDocument extends Document {
//   shippingInfo: ShippingInfo;
//   user: string;
//   subtotal: number;
//   tax: number;
//   shippingCharges: number;
//   discount: number;
//   total: number;
//   status: "Processing" | "Shipped" | "Delivered";
//   orderItems: OrderItem[];
//   createdAt: Date;
//   updatedAt: Date;
// }

export type TMealText = {
    en: string;
    ru: string;
};

export type TMeal = {
  id: string;
  title: TMealText;
  description: TMealText;
  img: string;
  price: {
    usd: number;
    rub: number;
  };
};

export type TCartMeal = TMeal & {
  quantity: number;
};

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
}

export type TOrder = {
  id: number;
  items: TCartMeal[];
  orderInfo: {
    payment: PaymentMethod;
    address: string;
    phone: string;
  }
};

export type TUser = {
  id: string;
  email: string;
  ordersQuantity: number;
  cart: TCartMeal[] | null;
  orders: TOrder[] | null;
  name?: string;
  address?: string;
  phone?: string;
  payment?: PaymentMethod;
};


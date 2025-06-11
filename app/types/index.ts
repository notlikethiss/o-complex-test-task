export interface Products {
  description: string;
  id: number;
  image_url: string;
  price: number;
  title: string;
}

export interface Review {
  id: number;
  text: string;
}

export interface QueryProduct {
  id: number;
  quantity: number;
}

export interface ClientCart {
  title: string;
  quantity: number;
  price: number;
  id: number;
}

export interface User {
  phone: string;
  queryCart: QueryProduct[];
  clientCart: ClientCart[];
}

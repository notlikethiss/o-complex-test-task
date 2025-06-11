import { makeAutoObservable } from "mobx";
import { ClientCart, QueryProduct, User } from "../types";

class UserStore {
  public user: User = {
    phone: "",
    queryCart: [],
    clientCart: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setPhone(value: string) {
    this.user.phone = value;
  }

  setQueryCart(value: QueryProduct[]) {
    this.user.queryCart = value;
  }

  setClientCart(value: ClientCart[]) {
    this.user.clientCart = value;
    this.syncQueryCart(); // автоматически синхронизируем
  }

  incrementItem(id: number, title?: string, price?: number) {
    const existing = this.user.clientCart.find((item) => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else if (title && price !== undefined) {
      this.user.clientCart.push({ id, title, price, quantity: 1 });
    }
    this.syncQueryCart();
  }

  decrementItem(id: number) {
    const updatedCart = this.user.clientCart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    this.user.clientCart = updatedCart;
    this.syncQueryCart();
  }

  syncQueryCart() {
    this.user.queryCart = this.user.clientCart.map(({ id, quantity }) => ({
      id,
      quantity,
    }));
  }
}

export const userStore = new UserStore();

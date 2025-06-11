"use client";

import { type FC } from "react";
import { InputMask } from "@react-input/mask";
import { userStore } from "../store";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const Cart: FC = observer(() => {
  const makeOrder = async () => {
    if (userStore.user.phone && userStore.user.queryCart.length !== 0) {
      await axios
        .post("http://o-complex.com:1337/order", {
          phone: userStore.user.phone.replace(/\D/g, ""),
          cart: userStore.user.clientCart,
        })
        .then((res) =>
          res.status === 200 || res.status === 201
            ? enqueueSnackbar({
                variant: "success",
                message: "Заказ успешно создан!",
              })
            : enqueueSnackbar({
                variant: "error",
                message: "Ошибка",
              })
        );
    } else {
      enqueueSnackbar({ variant: "error", message: "Проверьте форму!" });
    }
  };

  return (
    <div className="flex flex-col bg-[#D9D9D9] p-2.5 rounded-2xl mb-[47px] mt-[240px]">
      <h1 className="text-black md:text-4xl">Добавленные товары</h1>
      <div className="flex flex-col mt-3">
        {userStore.user.clientCart.map((item) => (
          <h1 className="flex gap-4 text-black" key={item.title}>
            <p>{item.title}</p>
            <p>x{item.quantity}</p>
            <p>{item.price * item.quantity}₽</p>
          </h1>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 mt-3 max-md:flex-col ">
        <InputMask
          className="w-full px-4 py-3 rounded-2xl bg-[#222222] max-sm:text-2xl text-4xl text-white placeholder-white focus:outline-none"
          mask="+7 (___) ___-__-__"
          placeholder="+7 (___) ___ __ __"
          onChange={(e) => userStore.setPhone(e.target.value)}
          replacement={{ _: /\d/ }}
        />
        <button
          onClick={makeOrder}
          className="px-8 py-3 rounded-2xl max-sm:text-2xl text-4xl bg-[#222222] max-md:w-[100%]"
        >
          Заказать
        </button>
      </div>
    </div>
  );
});

export default Cart;

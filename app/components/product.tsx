import Image from "next/image";
import { useState, type FC } from "react";
import { userStore } from "../store";
import { observer } from "mobx-react-lite";

interface ProductProps {
  title: string;
  description: string;
  image: string;
  price: number;
  id: number;
}

const Product: FC<ProductProps> = observer(
  ({ title, description, price, image, id }) => {
    const [isImageRemoved, setIsImageRemoved] = useState(false);
    const user = userStore.user;

    const cartItem = user.clientCart.find((item) => item.id === id);
    const quantity = cartItem?.quantity || 0;

    const handleBuy = () => {
      userStore.incrementItem(id, title, price);
    };

    const handleIncrement = () => {
      userStore.incrementItem(id);
    };

    const handleDecrement = () => {
      userStore.decrementItem(id);
    };

    return (
      <div className="flex flex-col items-center justify-between bg-slate-200 p-2.5 rounded-2xl">
        {!isImageRemoved ? (
          <Image
            className="rounded-2xl"
            alt="product-image"
            src={image}
            width={280}
            height={360}
            onError={() => setIsImageRemoved(true)}
          />
        ) : (
          <div className="w-[220px] h-[140px] rounded-2xl bg-gray-400"></div>
        )}
        <h1 className="lg:text-3xl sm:text-2xl text-black font-bold">
          {title}
        </h1>
        <p className="lg:text-2xl sm:text-lg text-black max-w-full text-wrap my-2">
          {description}
        </p>

        {quantity === 0 ? (
          <div className="flex flex-col w-full items-center">
            <h1 className="lg:text-3xl sm:text-2xl text-black mb-2">
              Цена: {price}₽
            </h1>
            <button
              className="bg-[#222222] w-full p-3 rounded-2xl text-white"
              onClick={handleBuy}
            >
              Купить
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="lg:text-3xl sm:text-2xl text-black mb-2">
              Цена: {price}₽
            </h1>
            <div className="flex items-center justify-between w-full gap-2">
              <button
                className="bg-[#222222] w-full p-3 rounded-2xl text-white"
                onClick={handleDecrement}
              >
                −
              </button>
              <div className="bg-[#222222] w-full text-center p-3 rounded-2xl text-white">
                {quantity}
              </div>
              <button
                className="bg-[#222222] w-full p-3 rounded-2xl text-white"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Product;

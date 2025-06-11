"use client";
import { useEffect, useState } from "react";
import Product from "./components/product";
import axios from "axios";
import Feedback from "./components/feedback";
import Cart from "./components/cart";
import type { Products, Review } from "./types";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  const [products, setProducts] = useState<Products[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const getProducts = async () => {
    await axios
      .get("http://o-complex.com:1337/products?page=1&page_size=20", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setProducts(res.data.items));
  };

  const getReviews = async () => {
    await axios
      .get("http://o-complex.com:1337/reviews", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setReviews(res.data));
  };

  useEffect(() => {
    getProducts();
    getReviews();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center mt-[105px] px-4">
      <div className="grid max-md:grid-cols-[repeat(1,300px)] gap-4">
        {reviews.map((item) => (
          <Feedback text={item.text} id={item.id} key={item.id} />
        ))}
      </div>
      <Cart />
      <div className="grid min-md:grid-cols-[repeat(3,300px)] gap-9 min-lg:px-24">
        {products.map((item) => (
          <Product
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.image_url}
            id={item.id}
          />
        ))}
      </div>
    </main>
  );
});

export default Home;

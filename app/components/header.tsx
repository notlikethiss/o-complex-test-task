import type { FC } from "react";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-center p-4 w-[100%] rounded-2xl bg-[#777777]">
      <h1 className="md:text-8xl sm:text-3xl">тестовое задание</h1>
    </header>
  );
};

export default Header;

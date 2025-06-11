"use client";

import { SnackbarProvider } from "notistack";
import type { FC, ReactNode } from "react";

const NotistackProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};

export default NotistackProvider;

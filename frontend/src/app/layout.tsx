'use client';

import { store } from "@/store/store";
import { Provider } from "react-redux";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
      <body>
        {children}
      </body>
      </Provider>
    </html>
  );
}

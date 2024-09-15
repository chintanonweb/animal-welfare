import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "./context/GlobalContext";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Animal Welfare App",
  description: "From Your Heart to Their Bowl Contribute and Comfort",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}

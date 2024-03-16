import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <h1 className="font-display text-2xl font-bold">Hello, World!</h1>
      <h1 className="text-2xl font-bold">Hello, World!</h1>
    </main>
  );
}

'use client';

import Image from "next/image";
import Gallery from "./components/Gallery";
import { Curtains } from "react-curtains";

export default function Home() {
  return (
    <main className="">
      <Curtains>
        <Gallery />
      </Curtains>
    </main>
  );
}

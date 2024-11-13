'use client';

import { Curtains } from "react-curtains";
import Gallery from "../components/Snowy";
import { datas } from "../../datas";
import { Neue } from '../../app/fonts/fontConfig.js'


export default function Snowy() {
  return (
    <main className={`${Neue.className}`}>
      <Curtains>
        <Gallery data={datas.snowy}/>
      </Curtains>
      </main>
  );
}
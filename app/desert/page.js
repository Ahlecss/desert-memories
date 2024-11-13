'use client';

import { Curtains } from "react-curtains";
import Gallery from "../components/Desert";
import { datas } from "../../datas";
import { Hatton } from '../../app/fonts/fontConfig.js'


export default function Desert() {
  return (
    <main className={`${Hatton.className}`}>
      <Curtains>
        <Gallery data={datas.desert}/>
      </Curtains>
      </main>
  );
}
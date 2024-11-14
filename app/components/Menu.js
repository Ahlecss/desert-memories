'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Hatton, Neue } from '../../app/fonts/fontConfig.js'


export default function Menu() {
    const nav = useRef()
    const list = useRef()
    const [expanded, setExpanded] = useState(false); // État pour gérer l'expansion

    const refSize = useRef({
        height: 0,
        width: 0
    })

    useEffect(() => {
        refSize.height = nav.current.clientHeight
        refSize.width = nav.current.clientWidth

        console.log(refSize)

    }, [])
    const mouseEnter = () => {
        setExpanded(true); // Augmente la taille du nav
        list.current.classList.remove('opacity-0')
        nav.current.style.height = `${16}rem`;
        nav.current.style.width = `${20}rem`;
        
    }
    const mouseLeave = () => {
        setExpanded(false); // Réduit la taille du nav
        list.current.classList.add('opacity-0')
        nav.current.style.height = `${3.5}rem`;
        nav.current.style.width = `${10}rem`;

    }

    // nav.current.style
    return (
        <nav ref={nav} className={`absolute right-4 top-4 z-[100] bg-[#393939] rounded-[40px] cursor-pointer h-[3.5rem] w-[10rem]`}
            onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <p className={`${Neue.className} flex justify-center mr-6 ml-6 mt-4 mb-4 pointer-events-none`}>Memories</p>
            <ul ref={list} className="menu-list flex flex-col gap-8 md:ml-8 mt-8 ml-4 mr-20 opacity-0">
                <li onClick={mouseLeave}><Link className={`text-5xl ${Hatton.className} ${expanded ? '' : 'pointer-events-none'}`} href="/desert" >Desert</Link></li>
                <li onClick={mouseLeave}><Link className={`text-5xl ${Neue.className} ${expanded ? '' : 'pointer-events-none'}`} href="/snowy" >Snowy</Link></li>
            </ul>
        </nav>
    )
}
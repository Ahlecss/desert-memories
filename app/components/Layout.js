import { isMobile } from "react-device-detect";

import { Plane } from "react-curtains";

import FragmentShader from "@/shaders/desert.frag";
import VertexShader from "@/shaders/desert.vert";

export default function Layout(props) {

    const { data, uniforms, canChangeView, onChangeView, onChangeEffect } = props

    const imgs = data.images.map((plane, i) =>
        <div className="plane-wrapper" key={i}>
            <Plane
                className="BasicPlane"
                vertexShader={VertexShader}
                fragmentShader={FragmentShader}
                uniforms={uniforms}
                widthSegments={200}
                heightSegments={200}
                watchScroll={false}
                cullFace={"none"}
            >
                <img src={plane.src} className="h-full w-full" alt="" />
            </Plane>
        </div>
    )
    return (
        <div>
            <div className="BasicPlane">
                {imgs}
            </div>
            <button className={`absolute z-[100] left-8 top-8 transition-all duration-500 hover:opacity-80 font-extralight ${!canChangeView ? 'opacity-0' : ''}`} disabled={!canChangeView} onClick={onChangeView}>Change view</button>
            <button className={`absolute z-[100] left-8 top-16 transition-all duration-500 hover:opacity-80 font-extralight ${!canChangeView ? 'opacity-0' : ''}`} disabled={!canChangeView} onClick={onChangeEffect}>Toggle effect</button>
            <p className={`absolute z-[100] right-8 top-12 md:right-auto md:top-auto md:left-8 md:bottom-12 transition-all duration-500 font-extralight	${!canChangeView ? 'opacity-0' : ''}`} >( {isMobile ? 'Drag' : 'Scroll '} to rotate )</p>

            <h1 className={`absolute w-max z-[100] -translate-y-1/2 -translate-x-1/2 left-[50%] top-[50%] text-2xl md:text-8xl`}>{data.title}</h1>
            <div className={`absolute z-[100] flex flex-col items-end right-8 bottom-24 md:bottom-12 transition-all duration-500`}>
                <h3 className="text-lg tracking-tight"><span className="font-sans text-sm tracking-wide opacity-80">Pictures by</span> <a href="https://www.remydumas.fr/" target="_blank" className="hover:opacity-80 font-normal	">Rémy Dumas</a></h3>
                <h3 className="text-lg tracking-tight"><span className="font-sans text-sm tracking-wide opacity-80">Font by</span> <a href="https://pangrampangram.com/products/hatton" target="_blank" className="hover:opacity-80 font-normal	">Pangram Pangram</a></h3>
                <h3 className="text-lg tracking-tight"><span className="font-sans text-sm tracking-wide opacity-80">Code and idea by</span> <a href="https://alexissejourne.fr" target="_blank" className="hover:opacity-80 font-normal	">Alexis Sejourné</a></h3>
            </div>

            <div className="curtain-intro"></div>
        </div>
    )
}
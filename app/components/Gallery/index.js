'use client';

import { useEffect, useRef } from "react";
import { Vec2, } from "curtainsjs";
import { Plane, useCurtains, useCurtainsEvent } from "react-curtains";

import { easeOutCubic, lerp } from "../../utils/math"
import VertexShader from "../../shaders/plane.vert"
import FragmentShader from "../../shaders/plane.frag"
import './gallery.css'
import gsap, { Power3, Power4 } from "gsap";
import { Cubic } from "gsap";

function Gallery() {

    const globalCurtains = useRef([]);

    const galleryWrap = useRef([]);
    const scrollTarget = useRef(0);
    const unwrap = useRef(0);
    const cardsEffect = useRef(0);
    const scroll = useRef(0);


    const images = [
        {
            src: 'image1.jpg'
        },
        {
            src: 'image2.jpg'
        },
        {
            src: 'image3.jpg'
        },
        {
            src: 'image4.jpg'
        },
        {
            src: 'image5.jpg'
        },
        {
            src: 'image6.jpg'
        },
        {
            src: 'image7.jpg'
        },
        {
            src: 'image8.jpg'
        },
        {
            src: 'image9.jpg'
        },
        {
            src: 'image10.jpg'
        },

    ]

    const uniforms = {
        time: {
            name: "u_time",
            type: "1f",
            value: 0
        },
        u_mouse: {
            name: "u_mouse",
            type: "2f",
            value: new Vec2(0, 0)
        },
        u_res: {
            name: "u_res",
            type: "2f",
            value: new Vec2(0, 0)
        },
        index: {
            name: "u_index",
            type: "1f",
            value: 0
        },
        totalImages: {
            name: "u_totalIndex",
            type: "1f",
            value: 0
        },
        scroll: {
            name: "u_scroll",
            type: "1f",
            value: 0,
        },
        unwrap: {
            name: "u_unwrap",
            type: "1f",
            value: 0,
        },
        cardsEffect: {
            name: "u_cardsEffect",
            type: "1f",
            value: 0,
        },

    }
    useCurtains((curtains) => {
        globalCurtains.current = curtains;

        const tl = gsap.timeline({ delay: 3.5 })

        globalCurtains.current.planes.forEach((plane, i) => {
            gsap.to(plane.uniforms.cardsEffect, {
                value: 10,
                duration: 3,
                delay: 0.2 * i,
                ease: Power4.easeInOut
            })
        })
        tl.to(unwrap, {
            current: 1,
            duration: 2,
            ease: Power4.easeInOut
        })
        curtains.planes.forEach((plane, i) => {
            plane.uniforms.index.value = i
            plane.uniforms.totalImages.value = curtains.planes.length
        });
        //images[i].uniforms.index.value = i;
    });

    useCurtainsEvent('onRender', (curtains) => {
        scrollTarget.current = lerp(scrollTarget.current, 0, 0.05);

        curtains.planes.forEach((plane, i) => {
            plane.uniforms.time.value++;
            plane.uniforms.scroll.value += (scroll.current - scrollTarget.current) * 0.01;
            plane.uniforms.unwrap.value = unwrap.current;

            // plane.rotation.y = lerp(plane.rotation.y, 2 * 3.1415 * -unwrap.current * i / 4 - scrollTarget.current * 0.01, 0.01);
            // plane.updatePosition();
        })
        // curtains.needRender();
    })

    useEffect(() => {

        if (typeof window != 'undefined') {

            const onScroll = (e) => {
                const delta = {};
                delta.y = -e.deltaY;

                // threshold
                if (delta.y > 60) {
                    delta.y = 60;
                }
                else if (delta.y < -60) {
                    delta.y = -60;
                }
                scrollTarget.current = lerp(scrollTarget.current, delta.y * 0.2, easeOutCubic(0.1));
            }
            // EVENTS
            window.addEventListener('wheel', onScroll);
        }
    })

    const onRender = (plane) => {
        // plane.uniforms.time.value++;
        // plane.uniforms.scroll.value += (scroll.current - scrollTarget.current) * 0.01;
        // plane.uniforms.unwrap.value = unwrap.current;
        // plane.uniforms.cardsEffect.value = cardsEffect.current;
    }

    const imgs = images.map((plane, i) =>
        <div className="plane-wrapper" key={i}>
            <Plane
                className="BasicPlane"
                vertexShader={VertexShader}
                fragmentShader={FragmentShader}
                uniforms={uniforms}
                // onRender={onRender}
                // onReady={() => onReady(i)}
                widthSegments={200}
                heightSegments={200}
                watchScroll={false}
                cullFace={"none"}
            // drawCheckMargins={{
            //     top: 0,
            //     right: -100,
            //     bottom: 0,
            //     left: -100,
            // }}
            >
                <img src={plane.src} className="h-full w-full" alt="" />
            </Plane>
        </div>

    )
    return (
        <div className="BasicPlane">
            {imgs}
        </div>
    )

}

export default Gallery;
'use client';

import { useEffect, useRef, useState } from "react";
import { Vec2, } from "curtainsjs";
import { Plane, useCurtains, useCurtainsEvent } from "react-curtains";

import { easeOutCubic, lerp } from "../../utils/math"
import VertexShader from "../../shaders/plane.vert"
import FragmentShader from "../../shaders/plane.frag"
import './gallery.css'
import gsap, { Power3, Power4 } from "gsap";
import { Cubic } from "gsap";
import { isMobile } from "react-device-detect";
import { textAnimation } from "@/app/utils/animations";

function Gallery() {

    const globalCurtains = useRef([]);

    const galleryWrap = useRef([]);
    const scrollTarget = useRef(0);
    const mouseCoords = useRef(new Vec2(0, 0));
    const unwrap = useRef(0);
    const cardsEffect = useRef(0);
    const scroll = useRef(0);
    const canPlay = useRef(false);
    const initialPositionY = useRef(9);
    const initialPositionX = useRef(0);
    const [canChangeView, setChangeView] = useState(false);
    const offsetX = useRef(0);

    let startX;

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
        mouse: {
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
        scrollSpeed: {
            name: "u_scrollSpeed",
            type: "1f",
            value: 0,
        },
        unwrap: {
            name: "u_unwrap",
            type: "1f",
            value: 0,
        },
        initialPositionX: {
            name: "u_initialPositionX",
            type: "1f",
            value: 9,
        },
        initialPositionY: {
            name: "u_initialPositionY",
            type: "1f",
            value: 9,
        },
        cardsEffect: {
            name: "u_cardsEffect",
            type: "1f",
            value: 0,
        },
        isMobile: {
            name: "u_isMobile",
            type: "1f",
            value: 0,
        },

    }
    useCurtains((curtains) => {
        globalCurtains.current = curtains;

        const tl = gsap.timeline({})

        globalCurtains.current.planes.forEach((plane, i) => {
            plane.uniforms.initialPositionY.value = uniforms.initialPositionY.value;
            gsap.fromTo(plane.uniforms.initialPositionX,
                {
                    value: - 25. + Math.random() * 50,
                },
                {
                    value: 0,
                    duration: 3,
                    delay: 3 + 0.2 * i,
                    ease: Power4.easeInOut
                })
            gsap.to(plane.uniforms.cardsEffect, {
                value: 10,
                duration: 3,
                delay: 3 + 0.2 * i,
                ease: Power4.easeInOut
            })
        })
        tl.to(unwrap, {
            current: 1,
            duration: 2,
            delay: 3 + 3.5,
            ease: Power4.easeInOut
        }).add(() => {
            canPlay.current = true
            setChangeView(true)
        }, "-=1")
        curtains.planes.forEach((plane, i) => {
            plane.uniforms.index.value = i
            plane.uniforms.totalImages.value = curtains.planes.length
            plane.uniforms.isMobile.value = isMobile;
        });
        //images[i].uniforms.index.value = i;
    });

    useCurtainsEvent('onRender', (curtains) => {
        scrollTarget.current = lerp(scrollTarget.current, 0, 0.05);

        curtains.planes.forEach((plane, i) => {
            if (canPlay.current) plane.uniforms.time.value++;
            plane.uniforms.scroll.value += (scroll.current - scrollTarget.current - offsetX.current * 0.2) * 0.01;
            plane.uniforms.scrollSpeed.value = lerp(plane.uniforms.scrollSpeed.value, Math.abs(scroll.current - scrollTarget.current) * 0.1, 0.1);
            plane.uniforms.unwrap.value = unwrap.current;
            plane.uniforms.mouse.value = mouseCoords.current;
            plane.uniforms.u_res.value = uniforms.u_res.value;

            // plane.rotation.y = lerp(plane.rotation.y, 2 * 3.1415 * -unwrap.current * i / 4 - scrollTarget.current * 0.01, 0.01);
            // plane.updatePosition();
        })
        // curtains.needRender();
    })

    useEffect(() => {

        if (typeof window != 'undefined') {
            window.mouse = new Vec2(0, 0);
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
            const mouseXTo = gsap.quickTo(window.mouse, 'x', {
                duration: 0.1,
                // ease: Strong.easeOut
                ease: Cubic.easeOut,
            })
            const mouseYTo = gsap.quickTo(window.mouse, 'y', {
                duration: 0.1,
                // ease: Strong.easeOut
                ease: Cubic.easeOut,
            })

            const onMouseMove = (e) => {
                mouseXTo((e.clientX))
                mouseYTo(((e.clientY)))
                mouseCoords.current = globalCurtains.current.planes[1].mouseToPlaneCoords(window.mouse);
                console.log(mouseCoords.current)
            }


            function handleDragStart(event) {
                // Store initial mouse position
                startX = event.touches[0].clientX;
                // Calculate initial box offset
                offsetX.current = 0;
                // Add event listeners for drag and dragend events
                window.addEventListener('touchmove', handleDrag);
                window.addEventListener('touchend', handleDragEnd);
            }
            // Function to handle drag event
            function handleDrag(event) {
                offsetX.current = lerp(offsetX.current, event.touches[0].clientX - startX, easeOutCubic(0.5));
                startX = event.touches[0].clientX;
            }
            function handleDragEnd() {
                window.removeEventListener('drag', handleDrag);
                window.removeEventListener('dragend', handleDragEnd);
            }
            // EVENTS
            window.addEventListener('wheel', onScroll);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('touchstart', handleDragStart);

        }
    })

    useEffect(() => {
        textAnimation('h1', 2, 'chars')
        textAnimation('h3', 9, 'lines')
    }, [])

    const onChangeView = () => {
        setChangeView(false)
        globalCurtains.current.planes.forEach((plane, i) => {
            gsap.to(plane.uniforms.cardsEffect, {
                value: 3,
                duration: 2,
                delay: 0.2 * i,
                ease: Power4.easeInOut
            })
            gsap.to(plane.uniforms.initialPositionY, {
                value: 2.5,
                duration: 2,
                delay: 3,
                ease: Power4.easeInOut,
            })
        })
    }

    const onResize = () => {
        if (typeof window !== 'undefined') {
            uniforms.u_res.value = new Vec2(window.innerWidth, window.innerHeight)
            // uniforms.u_PR.value = window.devicePixelRatio.toFixed(1)
        }
    }
    onResize()

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
        <div className="w-full h-full">
            <div className="BasicPlane">
                {imgs}
            </div>
            <button className={`absolute z-[100] left-8 top-8 transition-all duration-500 ${!canChangeView ? 'opacity-0' : ''}`} disabled={!canChangeView} onClick={onChangeView}>Change view</button>

            <h1 className={`absolute w-max z-[100] -translate-y-1/2 -translate-x-1/2 left-[50%] top-[50%] text-2xl md:text-8xl`}>Desert Memories</h1>
            <div className={`absolute z-[100] flex flex-col items-end right-8 bottom-8 transition-all duration-500`}>
                <h3 className="text-lg tracking-tight"><span className="font-sans text-sm tracking-wide opacity-80">Pictures by</span> <a href="https://www.remydumas.fr/" target="_blank">Rémy Dumas</a></h3>
                <h3 className="text-lg tracking-tight"><span className="font-sans text-sm tracking-wide opacity-80">Font by</span> <a href="https://pangrampangram.com/products/hatton" target="_blank">Pangram Pangram</a></h3>
                <h3 className="text-lg tracking-tight"><span className="font-sans text-sm tracking-wide opacity-80">Code and idea by</span> <a href="https://alexissejourne.fr" target="_blank">Alexis Sejourné</a></h3>
            </div>
        </div>
    )

}

export default Gallery;
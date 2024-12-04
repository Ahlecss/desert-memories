'use client';

import { Vec2, } from "curtainsjs";
import gsap, { Cubic, Power4, Quad } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ShaderPass, useCurtains, useCurtainsEvent } from "react-curtains";
import { isMobile } from "react-device-detect";

import { textSnowyAnimation } from "@/utils/animations";
import { easeOutCubic, lerp } from "@/utils/math";
import Layout from "../Layout";
import passVs from '../../shaders/shaderPass.vert'
import passFs from '../../shaders/shaderPass.frag'
import './gallery.css';

function Gallery(props) {

    const { data } = props;

    const globalCurtains = useRef([]);

    const mouseCoords = useRef(new Vec2(0, 0));
    const scrollTarget = useRef(0);
    const scrollDirection = useRef(0);
    const offsetX = useRef(0);
    const scroll = useRef(0);

    const unwrap = useRef(0);
    const canPlay = useRef(false);
    const [canChangeView, setChangeView] = useState(false);

    const hasChanged = useRef(true);
    const hasNoisy = useRef(true);

    let startX;

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
        scrollTarget: {
            name: "u_scrollTarget",
            type: "1f",
            value: 0,
        },
        scrollDirection: {
            name: "u_scrollDirection",
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
            value: 3,
        },
        initialPositionY: {
            name: "u_initialPositionY",
            type: "1f",
            value: 0,
        },
        initialPositionZ: {
            name: "u_initialPositionZ",
            type: "1f",
            value: 5,
        },
        cardsEffect: {
            name: "u_cardsEffect",
            type: "1f",
            value: 0,
        },
        noisyEffect: {
            name: "u_noisyEffect",
            type: "1f",
            value: 0,
        },
        isMobile: {
            name: "u_isMobile",
            type: "1f",
            value: 0,
        },
        startAnim: {
            name: "u_startAnim",
            type: "1f",
            value: 1,
        },
        startAnimRemoveRotation: {
            name: "u_startAnimRemoveRotation",
            type: "1f",
            value: 1,
        },
        startControl: {
            name: "u_startControl",
            type: "1f",
            value: 0,
        },

    }
    useCurtains((curtains) => {
        globalCurtains.current = curtains;

        const tl = gsap.timeline({})

        globalCurtains.current.planes.forEach((plane, i) => {
            gsap.fromTo(plane.uniforms.initialPositionX,
                {
                    value: 28,
                },
                {
                    value: -10,
                    duration: 3,
                    delay: 2 + 0.1 * i,
                    ease: Power4.ease
                })
            gsap.fromTo(plane.uniforms.initialPositionY,
                {
                    value: 0,
                },
                {
                    value: 1,
                    duration: 3,
                    delay: 2 + 0.1 * i,
                    ease: Power4.ease
                })
            gsap.fromTo(plane.uniforms.initialPositionZ,
                {
                    value: 26,
                },
                {
                    value: 2,
                    duration: 3,
                    delay: 2 + 0.1 * i,
                    ease: Power4.ease
                })


            gsap.fromTo(plane.uniforms.initialPositionX,
                {
                    value: 5,
                },
                {
                    value: -5,
                    duration: 2,
                    delay: 5 + 0.1 * i,
                    ease: Power4.ease
                })
            gsap.fromTo(plane.uniforms.initialPositionY,
                {
                    value: 5,
                },
                {
                    value: -5,
                    duration: 2,
                    delay: 5 + 0.1 * i,
                    ease: Power4.ease
                })
            gsap.fromTo(plane.uniforms.initialPositionZ,
                {
                    value: 6,
                },
                {
                    value: 8,
                    duration: 2,
                    delay: 5 + 0.1 * i,
                    ease: Power4.ease
                })


            gsap.fromTo(plane.uniforms.initialPositionZ,
                {
                    value: 8,
                },
                {
                    value: 4,
                    duration: 2,
                    delay: 7,
                    ease: Power4.ease
                }).then(() => {
                    gsap.to(plane.uniforms.startAnim,
                        {
                            value: 0,
                            duration: 2,
                        }
                    )
                    gsap.to(plane.uniforms.startControl,
                        {
                            value: 1,
                            duration: 2,
                        }
                    )
                    gsap.to(plane.uniforms.startAnimRemoveRotation,
                        {
                            value: 0,
                            duration: 0,
                        }
                    )
                })
        })
        tl.to(unwrap, {
            current: 1,
            duration: 6,
            delay: 1,
            ease: Power4.easeInOut
        }).add(() => {
            canPlay.current = true
            setChangeView(true)
            Array.from(document.getElementsByTagName('img')).forEach((img) => {
                img.remove()
            })
        }, "-=1")
        curtains.planes.forEach((plane, i) => {
            plane.uniforms.index.value = i
            plane.uniforms.totalImages.value = curtains.planes.length
            plane.uniforms.isMobile.value = isMobile;
        });
        //images[i].uniforms.index.value = i;
        // return () => {
        //     // console.log(globalCurtains.current)
        //     // if(globalCurtains.current) globalCurtains.current.dispose()
        // }
    });

    useCurtainsEvent('onRender', (curtains) => {
        scrollTarget.current = lerp(scrollTarget.current, 0, 0.01);

        scrollDirection.current = lerp(scrollDirection.current, Math.min(Math.max(scrollTarget.current, -1), 1), 0.1);

        // console.log('speed', scrollSpeed.value)
        curtains.planes.forEach((plane, i) => {
            // if (canPlay.current) 
            plane.uniforms.time.value++;
            plane.uniforms.scroll.value += (scroll.current - scrollTarget.current - offsetX.current * 0.2) * 0.01;
            plane.uniforms.scrollSpeed.value = lerp(plane.uniforms.scrollSpeed.value, Math.abs(scroll.current - scrollTarget.current) * 0.1, 0.1);
            if (plane.uniforms.scrollTarget) plane.uniforms.scrollTarget.value = scrollTarget.current;
            if (plane.uniforms.scrollDirection) plane.uniforms.scrollDirection.value = scrollDirection.current
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
                scrollTarget.current = lerp(scrollTarget.current, delta.y * 0.4, easeOutCubic(0.01));
            }
            const mouseXTo = gsap.quickTo(window.mouse, 'x', {
                duration: 0.1,
                ease: Cubic.easeOut,
            })
            const mouseYTo = gsap.quickTo(window.mouse, 'y', {
                duration: 0.1,
                ease: Cubic.easeOut,
            })

            const onMouseMove = (e) => {
                mouseXTo((e.clientX / window.innerWidth) * 2 - 1)
                mouseYTo(-((e.clientY) / window.innerHeight) * 2 + 1)
                mouseCoords.current = window.mouse;
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
                gsap.to(offsetX, {
                    current: 0,
                    duration: 0.7,
                    ease: Quad.easeOut,
                    overwrite: true
                })
                window.removeEventListener('drag', handleDrag);
                window.removeEventListener('dragend', handleDragEnd);
            }
            // EVENTS
            setTimeout(() => {
                window.addEventListener('wheel', onScroll);
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('touchstart', handleDragStart), 9000
            });

        }
    })

    useEffect(() => {
        textSnowyAnimation('h1', 1, 'chars')
        textSnowyAnimation('h3', 10, 'lines')
    }, [])

    const onChangeView = () => {
        //     setChangeView(false)
        //     hasChanged.current = !hasChanged.current
        //     globalCurtains.current.planes.forEach((plane, i) => {
        //         gsap.to(plane.uniforms.cardsEffect, {
        //             value: hasChanged.current ? 10 : 3,
        //             duration: 2,
        //             delay: 0.2 * i,
        //             ease: Power4.easeInOut
        //         })
        //         gsap.to(plane.uniforms.initialPositionY, {
        //             value: hasChanged.current ? 9 : 2.5,
        //             duration: 2,
        //             delay: 3,
        //             ease: Power4.easeInOut,
        //         }).then(() => {
        //             setChangeView(true)
        //         })
        //     })
    }

    const onChangeNoisy = () => {
        //     setChangeView(false)
            hasNoisy.current = !hasNoisy.current
            globalCurtains.current.planes.forEach((plane, i) => {
                gsap.to(plane.uniforms.noisyEffect, {
                    value: hasNoisy.current ? 0 : 1,
                    duration: 2,
                    ease: Power4.easeInOut
                }).then(() => {
                    // setChangeView(true)
                })
            })
    }

    const onResize = () => {
        if (typeof window !== 'undefined') {
            uniforms.u_res.value = new Vec2(window.innerWidth, window.innerHeight)
        }
    }
    onResize()

    return (
        <div className="">
            {/* <ShaderPass
                vertexShader={passVs}
                fragmentShader={passFs}
                // uniforms={passUniforms}
                // clear={false}
            /> */}
            <Layout data={data} uniforms={uniforms} canChangeView={canChangeView} onChangeEffect={onChangeNoisy} /*onChangeView={onChangeView}*/ />
        </div>
    )

}

export default Gallery;

import gsap, { Cubic, Power3, Power4 } from 'gsap'
import SplitType from 'split-type';

export function textDesertAnimation(classes, delay, type) {

    function wrap(el, wrapper) {
        wrapper.classList.add('split-parent')
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }

    if (typeof window !== 'undefined') {
        // Text animation
        const childSplit = new SplitType(classes, {
            types: "lines, words, chars",
            lineClass: "split-parent",
            wordClass: "split-child"
        });

        childSplit.lines.forEach((line) => {
            wrap(line, document.createElement('div'));
        })

        const tl = gsap.timeline({ paused: false })
        if (type === 'lines') {
            tl.from(childSplit.lines, {
                delay: delay,
                duration: 1,
                opacity: 0,
                yPercent: 100,
                ease: "circ.inOut",
                stagger: 0.2
            });
        } else {
            tl.from(childSplit.chars, {
                delay: delay,
                duration: 1,
                opacity: 0,
                yPercent: 100,
                ease: "circ.inOut",
                stagger: {
                    each: 0.05,
                    from: 'random'
                }
            });
            tl.to(childSplit.chars, {
                delay: 2,
                duration: 1,
                opacity: 0,
                yPercent: -100,
                ease: "circ.inOut",
                stagger: {
                    each: 0.05,
                    from: 'random'
                }
            }
            )
        }
    }
}


export function textSnowyAnimation(classes, delay, type) {

    function wrap(el, wrapper) {
        wrapper.classList.add('split-parent')
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }

    if (typeof window !== 'undefined') {
        // Text animation
        const childSplit = new SplitType(classes, {
            types: "lines, words, chars",
            lineClass: "split-parent",
            wordClass: "split-child"
        });

        childSplit.lines.forEach((line) => {
            wrap(line, document.createElement('div'));
        })

        const tl = gsap.timeline({ paused: false })
        if (type === 'lines') {
            tl.from(childSplit.lines, {
                delay: delay,
                duration: 1,
                opacity: 0,
                yPercent: 100,
                ease: "power3.inOut",
                stagger: 0.2
            });
        } else {
            tl.from(childSplit.chars, {
                delay: delay,
                opacity: 0,
                textShadow: "0 0 32px white",
                duration: 1,
                ease: "power3.inOut",
                stagger: {
                    each: 0.05,
                    from: 'left'
                }
            });
            tl.to(childSplit.chars, {
                delay: 2,
                opacity: 0,
                textShadow: "0 0 32px white",
                duration: 1,
                ease: "power3.inOut",
                stagger: {
                    each: 0.05,
                    from: 'left'
                }
            });
            // tl.fromTo(childSplit.chars, {
            //     opacity: 0,
            //     color: "transparent",
            //     textShadow: "0 0 32px white",
            // }, {
            //     opacity: 1,
            //     textShadow: '0 0 0px white',
            //     delay: delay,
            //     duration: 1,
            //     ease: "power4",
            //     stagger: {
            //         each: 0.05,
            //         from: 'left'
            //     }
            // });
            // tl.to(childSplit.chars, {
            //     delay: 2,
            //     duration: 1,
            //     opacity: 0,
            //     color: "transparent",
            //     textShadow: "0 0 0 white",
            //     ease: "power4",
            //     stagger: {
            //         each: 0.05,
            //         from: 'random'
            //     }
            // }
            // )
        }
    }
}
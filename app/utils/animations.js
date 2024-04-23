
import gsap, { Cubic, Power3, Power4 } from 'gsap'
import SplitType from 'split-type';

export function textAnimation(classes, delay, type) {

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
                ease: "power4",
                stagger: 0.2
            });
        } else {
            tl.from(childSplit.chars, {
                delay: delay,
                duration: 1,
                opacity: 0,
                yPercent: 100,
                ease: "power4",
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
                ease: "power4",
                stagger: {
                    each: 0.05,
                    from: 'random'
                }
            }
            )
        }
    }
}
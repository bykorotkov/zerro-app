import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export const usePreloader = () => {
    const boxRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (boxRef.current) {
            const timeline = gsap.timeline()

            // gsap.to(
            //     boxRef.current,
            //     {opacity: 0, duration: 1, delay: 1, onComplete: () => {
            //         if (boxRef.current) {
            //             boxRef.current.style.display = 'none'
            //         }
            //         }}
            //     ,
            // )

            // timeline.to(boxRef.current, {
            //     scale: 300,
            //     opacity: 1,
            //     duration: 1,
            //     ease: 'power2.out'
            // })
            //

            timeline.to(logoRef.current, {
                delay: 1,
                scale: 300,
                duration: 0.8,
                ease: `power2.in`,
            })

            timeline.to(boxRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: `power2.in`,
                onComplete: () => {
                    if (boxRef.current) {
                        boxRef.current.style.display = `none`
                    }
                },
            })
        }

        return
    }, [])

    return { boxRef, logoRef }
}

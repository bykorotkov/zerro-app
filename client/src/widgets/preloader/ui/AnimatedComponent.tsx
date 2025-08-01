import classes from "./AnimatedComponent.module.scss"
import rick from "@/shared/assets/images/rickImg.jpg"
import { usePreloader } from "@/widgets/preloader/model/hooks/usePreloader.ts"
import type { FC } from "react"

const AnimatedComponent: FC = () => {
    const { boxRef, logoRef } = usePreloader()

    return (
        <div
            className={classes.Animated}
            ref={boxRef}
        >
            <div
                className={classes.Logo}
                ref={logoRef}
            >
                <img
                    src={rick}
                    alt=""
                />
            </div>
        </div>
    )
}

export default AnimatedComponent

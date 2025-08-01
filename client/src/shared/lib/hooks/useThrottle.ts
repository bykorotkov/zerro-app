import { useEffect, useState } from "react"

const useThrottle = <T extends object>(value: T, delay: number): T => {
    const [throttledValue, setThrottledValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setThrottledValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return throttledValue
}

export default useThrottle

import { useState } from "react"

export const useActiveTeacher = () => {
    const [activeTeacherIndex, setActiveTeacherIndex] = useState(0)

    const changeTeacher = (index: number) => {
        setActiveTeacherIndex(index)
    }

    return { activeTeacherIndex, changeTeacher }
}
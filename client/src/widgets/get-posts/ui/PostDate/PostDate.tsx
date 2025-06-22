interface DateInterface {
    isoDate: Date
}

export const PostDate = ({ isoDate }: DateInterface) => {
    const date = new Date(isoDate)
    const formatter = new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC"
    })

    return <div>{formatter.format(date)}</div>
}

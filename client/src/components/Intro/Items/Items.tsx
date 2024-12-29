import classes from "./Items.module.scss";
import cn from "classnames";
import {CharactersData, IChar} from "@/types/types.ts";
import Loader from "@/components/ui/Loader/Loader.tsx";

interface ItemsProps {
    data: CharactersData
    isPending: boolean
    error: Error | null
}

const Items = ({data, isPending, error}: ItemsProps) => {
    if (isPending) return <div className={classes.Loading}><Loader /></div>

    if (error) return `<div>У нас тут ошибка</div>`

    return (
        <div className={cn({[classes.Items]: data.results && data.results.length } )}>
            {data.results && data.results.length ? data.results.map((item: IChar) =>
                <div className={classes.Item} key={item.id}>
                    <div className={classes.Title}>Имя: {item.name}</div>
                    <div className={classes.Sub}>Создан: {item.created}</div>
                    <div className={classes.Sub}>Пол: {item.gender}</div>
                    <div className={classes.Sub}>Тип: {item.species}</div>
                    <div className={classes.Sub}>Статус: {item.status}</div>
                    <img className={classes.Sub} src={item.image} alt={''} />
                </div>
            ) : <div className={classes.Failed}>Данные не были найдены :(</div>}
        </div>
    );
};

export default Items;
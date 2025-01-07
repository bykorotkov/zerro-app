import classes from "./Items.module.scss";
import cn from "classnames";
import {CharactersData, IChar} from "@/types/types.ts";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ItemsProps {
    data: CharactersData
    isPending: boolean
    error: Error | null
}

const Items = ({data, isPending, error}: ItemsProps) => {
    if (isPending) return <div className={classes.Loading}>
        {Array.from({length: 6}).map((_, index) => (
            <div className={classes.Item} key={index}>
                <Skeleton highlightColor={'#ffffff'} height={30} className={classes.Title} />
                <Skeleton highlightColor={'#ffffff'} height={20} className={classes.Sub} />
                <Skeleton highlightColor={'#ffffff'} height={20} className={classes.Sub} />
                <Skeleton highlightColor={'#ffffff'} height={20} className={classes.Sub} />
                <Skeleton highlightColor={'#ffffff'} height={300} className={classes.Image} />
            </div>
        ))}
    </div>

    if (error) return `<div>Ошибка запроса</div>`

    return (
        <div className={cn({[classes.Items]: data.results && data.results.length } )}>
            {data.results && data.results.length ? data.results.map((item: IChar) =>
                <div className={classes.Item} key={item.id}>
                    <div className={classes.Title}>Имя: {item.name}</div>
                    <div className={classes.Sub}>Создан: {item.created}</div>
                    <div className={classes.Sub}>Пол: {item.gender}</div>
                    <div className={classes.Sub}>Тип: {item.species}</div>
                    <div className={classes.Sub}>Статус: {item.status}</div>
                    <LazyLoadImage alt={'image of person'} loading={'lazy'} src={item.image} effect="blur" wrapperProps={{style: {transitionDelay: "1s"}}} />
                </div>
            ) : <div className={classes.Failed}>Данные не были найдены :(</div>}
        </div>
    );
};

export default Items;
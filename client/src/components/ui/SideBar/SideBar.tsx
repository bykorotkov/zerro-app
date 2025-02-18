import classes from './SideBar.module.scss'
import {LazyLoadImage} from "react-lazy-load-image-component";
import photo from "@/images/temp/person_photo.webp";
import Button from "@/components/ui/Button/Button.tsx";

const SideBar = () => {
    return (
        <div className={classes.Sidebar}>
            <div className={classes.Person}>
                <div className={classes.Photo}>
                    <LazyLoadImage src={photo} alt={''}/>
                </div>

                <div className={classes.Info}>
                    <div className={classes.Name}>Катя Иванова</div>
                    <div className={classes.Role}>ученик</div>
                </div>
            </div>

            <ul className={classes.Links}>
                <li className={classes.Link}>
                    <Button href={'/'}>Главная</Button>
                </li>

                <li className={classes.Link}>
                    <Button href={'/courses'}>Курсы</Button>
                </li>

                <li className={classes.Link}>
                    <Button href={'/homework'}>Домашка</Button>
                </li>

                <li className={classes.Link}>
                    <Button href={'/practice'}>Практика</Button>
                </li>

                <li className={classes.Link}>
                    <Button href={'/vocabulary'}>Словарь</Button>
                </li>
            </ul>

            <div className={classes.Payment}>
                Оплачено 5 занятий
            </div>
        </div>
    );
};

export default SideBar;
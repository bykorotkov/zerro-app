import classes from './Menu.module.scss'
import cn from "classnames";
import Modal from "@/components/global/Modal/Modal.tsx";
import Button from "@/components/ui/Button/Button.tsx";

interface MenuProps {
    className?: string
}

const Menu = ({className}: MenuProps) => {
    return (
        <Modal>
            <div className={cn(classes.Menu, className)}>
                <ul className={classes.List}>
                    <li><Button href={'/'}>Главная</Button></li>
                    <li><Button href={'/about'}>О школе</Button></li>
                    <li><Button href={'/posts'}>Посты</Button></li>
                    <li><Button href={'/study'}>Учебный процесс</Button></li>
                    <li><Button href={'/reviews'}>Отзывы</Button></li>
                    <li><Button href={'/prices'}>Стоимость</Button></li>
                    <li><Button href={'/contacts'}>Контакты</Button></li>
                </ul>
            </div>
        </Modal>
    );
};

export default Menu;
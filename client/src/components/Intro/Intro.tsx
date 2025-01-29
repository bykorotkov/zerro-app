import classes from './Intro.module.scss'
import Button from "@/components/ui/Button/Button.tsx";
import Input from "@/components/ui/Input/Input.tsx";
import Items from "@/components/Intro/Items/Items.tsx";
import useGetData from "@/hooks/useGetData.ts";
import AnimatedComponent from "@/components/Intro/AnimatedComponent/AnimatedComponent.tsx";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {useAuth} from "@/context/useAuthContext.tsx";
import Posts from "@/components/Intro/Posts/Posts.tsx";

const Intro = () => {
    const {isPending, error, data, search, searchHandler, page, nextPage, prevPage} = useGetData()
    const [isPreviewShown, setIsPreviewShown] = useState(false)
    const {logout} = useAuth()

    useEffect(() => {
        if (!Cookies.get('preview-is-shown')) {
            setIsPreviewShown(true)
            Cookies.set('preview-is-shown', 'true', {expires: 1})
        }
    }, []);

    return (
        <div className={classes.Intro}>
            <div className={classes.Head}>
                <div className={classes.Buttons}>
                    <Button onClick={prevPage} variant={'primary'}>предыдущая страница</Button>
                    <Button onClick={nextPage} variant={'secondary'}>следующая страница</Button>
                </div>

                <div>
                    <Button onClick={logout}>Выход</Button>
                </div>

                <div className={classes.Search}>
                    <Input type='text' value={search} placeholder={'Введите название персонажа...'} onChange={searchHandler} />
                </div>
            </div>

            {/*<Users />*/}

            {data && data.info && data.info.pages ? (
                <div className={classes.PageCount}>Страница <span>{page}</span> из <span>{data.info.pages}</span></div>
            ) : null}

            <Posts />

            {isPreviewShown ? (
                <AnimatedComponent />
            ) : null}

            <Items data={data} isPending={isPending} error={error} />

        </div>
    );
};

export default Intro;
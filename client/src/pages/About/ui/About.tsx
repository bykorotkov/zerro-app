import classes from './About.module.scss'
import { Intro } from "@/pages/About/ui/Intro/Intro.tsx"
import { Themes } from "@/pages/About/ui/Themes/Themes.tsx"
import { Teachers } from "@/pages/About/ui/Teachers/Teachers.tsx"
import { Reviews } from "@/pages/About/ui/Reviews/Reviews.tsx"
import {mockData} from "../model/mockData.ts";
import {AboutPageTypes} from "../model/types.ts";
import Layout from "@/app/layout/Layout.tsx";

export const About = () => {
    const data: AboutPageTypes = mockData

    return (
        <Layout>
            <div className={classes.About}>
                {data.intro ? <Intro data={data.intro} /> : null}
                {data.themes ? <Themes data={data.themes} /> : null}
                {data.teachers ? <Teachers data={data.teachers} /> : null}
                {data.reviews ? <Reviews data={data.reviews} /> : null}
            </div>
        </Layout>
    );
};
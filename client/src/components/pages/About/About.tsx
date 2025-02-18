import classes from './About.module.scss'
import Intro from "./Intro/Intro.tsx";
import Themes from "./Themes/Themes.tsx";
import Teachers from "./Teachers/Teachers.tsx";
import Reviews from "./Reviews/Reviews.tsx";
import {mockData} from "./mockData.ts";
import {AboutPageTypes} from "@/types/about/page.ts";
import Layout from "@/components/global/Layout/Layout.tsx";

const About = () => {
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

export default About;
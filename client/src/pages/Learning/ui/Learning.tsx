import { Intro } from "@/pages/Learning/ui/Intro/Intro.tsx";
import Layout from "@/app/layout/Layout.tsx";
import { Lessons } from "@/entities/lessons";
import classes from "./Learning.module.scss";

export const Learning = () => {
    return (
        <Layout>
            <div className={classes.Learning}>
                <Intro />
                <Lessons />
            </div>
        </Layout>
    );
};

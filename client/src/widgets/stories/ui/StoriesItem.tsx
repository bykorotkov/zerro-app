import { UseGenerateThumbnail } from "@/widgets/stories/model/hooks/useGenerateThumbnail.ts";
import type { StoryType } from "@/widgets/stories/model/types/stories.ts";
import cn from "classnames";
import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from "./Stories.module.scss";

interface StoriesItemType {
    data: StoryType;
    onOpen: () => void;
}

export const StoriesItem = ({ data, onOpen }: StoriesItemType) => {
    const { generatedThumbnail } = UseGenerateThumbnail(data.userVideo);

    return (
        <button
            className={classes.StoriesItem}
            onClick={onOpen}
            type="button"
        >
            {generatedThumbnail ? (
                <div className={classes.VideoPreview}>
                    <LazyLoadImage src={generatedThumbnail} />
                </div>
            ) : null}

            <div className={classes.StoriesCaption}>
                <div className={cn(classes.Avatar, { [classes.Active]: !data.isSeen })}>
                    <LazyLoadImage src={data.userAvatar} />
                </div>

                <div className={classes.Username}>{data.username}</div>
            </div>
        </button>
    );
};

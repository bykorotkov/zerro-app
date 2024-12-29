import Loader from "@/components/ui/Loader/Loader.tsx";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Loader> = {
    title: 'ui/Loader',
    component: Loader
}

export default meta

type Story = StoryObj<typeof Loader>

export const Default: Story = {
    args: {
        type: 'default'
    }
}

export const Red: Story = {
    args: {
        type: 'red'
    }
}

export const Green: Story = {
    args: {
        type: 'green'
    }
}
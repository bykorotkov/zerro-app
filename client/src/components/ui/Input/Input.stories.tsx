import {Meta, StoryObj} from "@storybook/react";
import Input from "@/components/ui/Input/Input.tsx";

const meta: Meta<typeof Input> = {
    title: 'ui/Input',
    component: Input
}

export default meta

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {

    }
}
import {Meta, StoryObj} from "@storybook/react";
import Button from "@/components/ui/Button/Button.tsx";

const meta: Meta<typeof Button> = {
    title: 'ui/Button',
    component: Button
}

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        onClick: () => alert('Primary Button Clicked!'),
        variant: 'primary',
        children: 'Primary Button',
    }
}

export const Secondary: Story = {
    args: {
        onClick: () => alert('Secondary Button Clicked!'),
        variant: 'secondary',
        children: 'Secondary Button',
    }
}
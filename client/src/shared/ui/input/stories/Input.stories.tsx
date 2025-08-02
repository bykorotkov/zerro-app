import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../ui/Input.tsx";

const meta: Meta<typeof Input> = {
    title: "input" as const,
    component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {},
};

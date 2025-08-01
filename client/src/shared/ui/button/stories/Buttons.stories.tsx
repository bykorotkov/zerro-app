import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../ui/Button.tsx"

const meta: Meta<typeof Button> = {
    title: `ui/button`,
    component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        onClick: () => alert(`Primary button Clicked!`),
        variant: `primary`,
        children: `Primary button`,
    },
}

export const Secondary: Story = {
    args: {
        onClick: () => alert(`Secondary button Clicked!`),
        variant: `secondary`,
        children: `Secondary button`,
    },
}

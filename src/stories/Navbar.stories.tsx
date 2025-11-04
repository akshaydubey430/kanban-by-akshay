import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "../components/Navbar/Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Kanban/Navbar",
  component: Navbar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    darkMode: false,
    toggleDarkMode: () => alert("Toggled!"),
  },
};

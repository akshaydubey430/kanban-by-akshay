import type { Meta, StoryObj } from "@storybook/react";
import { KanbanBoard } from "../components/KanbanBoard/KanbanBoard";
import { sampleColumns, sampleTasks } from "../sample-data";

const meta: Meta<typeof KanbanBoard> = {
  title: "Kanban/Board",
  component: KanbanBoard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    tasks: sampleTasks,
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {},
  },
};

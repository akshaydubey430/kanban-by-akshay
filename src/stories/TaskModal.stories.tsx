import type { Meta, StoryObj } from "@storybook/react";
import { TaskModal } from "../components/KanbanBoard/TaskModal";

const meta: Meta<typeof TaskModal> = {
  title: "Kanban/TaskModal",
  component: TaskModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TaskModal>;

export const Default: Story = {
  args: {
    open: true,
    task: {
      id: "1",
      title: "Edit Task",
      description: "Improve UI consistency",
    },
    onSave: (task) => console.log("Saved:", task),
    onDelete: () => console.log("Deleted"),
    onClose: () => console.log("Closed"),
  },
};

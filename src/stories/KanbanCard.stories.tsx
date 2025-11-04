import type { Meta, StoryObj } from "@storybook/react";
import { KanbanCard } from "../components/KanbanBoard/KanbanCard";

const meta: Meta<typeof KanbanCard> = {
  title: "Kanban/Card",
  component: KanbanCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KanbanCard>;

export const Default: Story = {
  args: {
    task: {
      id: "1",
      title: "Implement drag and drop",
      description: "Add D&D functionality",
      priority: "high",
      tags: ["Frontend"],
      assignee: "JD",
      dueDate: "2025-11-05",
    },
  },
};

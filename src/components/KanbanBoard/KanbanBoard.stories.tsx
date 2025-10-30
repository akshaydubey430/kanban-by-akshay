import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { KanbanBoard } from "./KanbanBoard";
import { sampleColumns, sampleTasks } from "../../sample-data";

const meta = {
  title: "Components/KanbanBoard",
  component: KanbanBoard
};
export default meta;

export const Default = {
  args: {
    columns: sampleColumns,
    tasks: sampleTasks,
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {}
  }
};

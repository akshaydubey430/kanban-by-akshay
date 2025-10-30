import { KanbanColumn, KanbanTask } from "./components/KanbanBoard/KanbanBoard.types";

export const sampleColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1','task-2'], maxTasks: 10 },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'], maxTasks: 5 },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [], maxTasks: 3 },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-4','task-5'] }
];

export const sampleTasks: Record<string, KanbanTask> = {
  'task-1': { id:'task-1', title: 'Implement drag and drop', description:'Add D&D functionality', status:'todo', priority:'high', assignee:'John Doe', tags:['frontend'], createdAt: new Date().toISOString(), dueDate: new Date(Date.now()+86400000).toISOString() },
  'task-2': { id:'task-2', title: 'Design task modal', status:'todo', priority:'medium', assignee:'Jane Smith', tags:['design','ui'], createdAt: new Date().toISOString(), dueDate: new Date(Date.now()+86400000*2).toISOString() },
  'task-3': { id:'task-3', title: 'Setup TypeScript', status:'in-progress', priority:'urgent', assignee:'John Doe', tags:['setup','typescript'], createdAt: new Date().toISOString() },
  'task-4': { id:'task-4', title: 'Create project structure', status:'done', priority:'low', assignee:'Jane Smith', tags:['setup'], createdAt: new Date().toISOString() },
  'task-5': { id:'task-5', title: 'Install dependencies', status:'done', priority:'low', assignee:'John Doe', tags:['setup'], createdAt: new Date().toISOString() }
};

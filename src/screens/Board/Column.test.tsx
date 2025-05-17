import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DragDropContext } from '@hello-pangea/dnd';
import { TaskData } from './TaskForm';
import Column from './Column';

function generateTasks(count: number): TaskData[] {
  return Array.from({ length: count }, () => ({
    id: String(Math.random()),
    title: `Title ${Math.random()}`,
    email: String(Math.random()),
    description: String(Math.random()),
  }));
}

it('does not show the "Add task" button if there are 100 tasks in the column', () => {
  const mockTasks = generateTasks(100);
  render(
    <DragDropContext onDragEnd={vi.fn()}>
      <Column id="column-1" title="Column" tasks={mockTasks} />
    </DragDropContext>
  );
  expect(screen.queryByTitle(/add task/i)).toBeNull();
});

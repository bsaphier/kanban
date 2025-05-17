import { afterEach, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from '.';
import useBoardStore from 'store/boardStore';

afterEach(() => {
  // reset the board after each test
  useBoardStore.getState().clearBoard();
});

it('renders columns', () => {
  render(<Board />);
  expect(screen.getByText(/To do/i)).toBeInTheDocument();
  expect(screen.getByText(/In progress/i)).toBeInTheDocument();
  expect(screen.getByText(/Done/i)).toBeInTheDocument();
});

it('creates tasks', async () => {
  const user = userEvent.setup();
  render(<Board />);
  const firstAddButton = screen.getAllByTitle('Add task')[0];
  await user.click(firstAddButton);

  const titleInput = screen.getByRole('textbox', { name: /title/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const descriptionInput = screen.getByRole('textbox', {
    name: /description/i,
  });
  const saveButton = screen.getByRole('button', { name: /save task/i });

  await userEvent.type(titleInput, 'Test Task');
  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.type(descriptionInput, 'This is a test description');

  await userEvent.click(saveButton);

  expect(screen.queryByText(/save task/i)).toBeNull();
  expect(screen.getByText('Test Task')).toBeInTheDocument();
});

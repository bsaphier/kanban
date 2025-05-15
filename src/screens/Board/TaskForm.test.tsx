import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm';

const mockUUID = '123e4567-e89b-12d3-a456-426614174000';

Object.defineProperty(window, 'crypto', {
  writable: true,
  value: {
    randomUUID: () => mockUUID,
  },
});

it('calls onSubmit with correct form data when submitted', async () => {
  const user = userEvent.setup();
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

  const titleInput = screen.getByRole('textbox', { name: /title/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const descriptionInput = screen.getByRole('textbox', {
    name: /description/i,
  });
  const saveButton = screen.getByRole('button', { name: /save task/i });

  await user.type(titleInput, 'Test Task');
  await user.type(emailInput, 'test@example.com');
  await user.type(descriptionInput, 'This is a test description');

  await user.click(saveButton);

  expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  expect(mockOnSubmit).toHaveBeenCalledWith({
    id: mockUUID,
    title: 'Test Task',
    email: 'test@example.com',
    description: 'This is a test description',
  });
});

it('calls onCancel when cancel button is clicked', async () => {
  const user = userEvent.setup();
  const mockOnCancel = jest.fn();

  render(<TaskForm onCancel={mockOnCancel} />);

  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  await user.click(cancelButton);

  expect(mockOnCancel).toHaveBeenCalledTimes(1);
});

it('does not throw an error when onSubmit is not provided', async () => {
  const user = userEvent.setup();

  render(<TaskForm />);

  const titleInput = screen.getByRole('textbox', { name: /title/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const descriptionInput = screen.getByRole('textbox', {
    name: /description/i,
  });
  const saveButton = screen.getByRole('button', { name: /save task/i });

  await user.type(titleInput, 'Test Task');
  await user.type(emailInput, 'test@example.com');
  await user.type(descriptionInput, 'This is a test description');

  await user.click(saveButton);

  // No assertion needed - test will fail if an error is thrown
});

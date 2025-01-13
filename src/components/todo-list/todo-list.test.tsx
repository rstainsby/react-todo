import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import TodoList from './todo-list';
import TodoListLoading from './todo-list.loading';

afterEach(cleanup);

describe('TodoList', () => {
  test('should render all todo items', () => {
    const todos = [
      { id: 1, todo: 'Task 1', completed: false, userId: 1 },
      { id: 2, todo: 'Task 2', completed: false, userId: 1 },
      { id: 3, todo: 'Task 3', completed: false, userId: 1 },
    ];

    const screen = render(<TodoList todos={todos} onTodoCompleted={() => {}} />);
    const list = screen.getByRole('list');
    const text = list.innerText;

    expect(text).toContain('Task 1');
    expect(text).toContain('Task 2');
    expect(text).toContain('Task 3');
  });

  test('should filter completed todos', () => {
    const todos = [
      { id: 1, todo: 'Task 1', completed: false, userId: 1 },
      { id: 2, todo: 'Task 2', completed: true, userId: 1 },
      { id: 3, todo: 'Task 3', completed: false, userId: 1 },
    ];

    const screen = render(<TodoList todos={todos} onTodoCompleted={() => {}} />);
    const list = screen.getByRole('list');
    const text = list.innerText;

    expect(text).toContain('Task 1');
    expect(text).not.toContain('Task 2');
    expect(text).toContain('Task 3');
  });

  test('should render add task button', () => {
    const screen = render(<TodoList todos={[]} onTodoCompleted={() => {}} />);
    const addTaskButton = screen.getByRole('button', { name: /add task/i });

    expect(addTaskButton).toBeDefined();
  });

  test('should envoke todo completed callback when marked as completed', async () => {
    let todos = [
      { id: 1, todo: 'Task 1', completed: false, userId: 1 },
      { id: 2, todo: 'Task 2', completed: false, userId: 1 },
      { id: 3, todo: 'Task 3', completed: false, userId: 1 },
    ];

    const onCompleted = vi.fn();

    const screen = render(<TodoList todos={todos} onTodoCompleted={onCompleted} />);
    const completeButton = screen.getByRole('button', { name: /complete-task-2/i });

    completeButton.click();

    expect(onCompleted).toHaveBeenCalledWith(2);
  });

  test.todo('should render a new task form when add task button is clicked', () => {

  });
});

describe('TodoList Loading', () => {
  test('should render a disabled add task button', () => {
    const screen = render(<TodoListLoading/>);
    const addTaskButton = screen.getByRole('button');

    expect(addTaskButton).toHaveProperty('disabled');
  });
});
import { describe, test, expect, afterEach, vi, beforeAll } from 'vitest';
import { render, cleanup, getByPlaceholderText, fireEvent } from '@testing-library/react';
import NewTodoForm from './new-todo-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node'

const queryClient = new QueryClient();

http.options('*', () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': '*',
    },
  })
})

const restHandlers = [
  http.post('https://dummyjson.com/todos/add', () => {
    return HttpResponse.json({ 
      id: 1, 
      task: 'New task', 
      completed: false, 
      userId: 1 
    })
  })
]

const server = setupServer(...restHandlers);

beforeAll(() => {
  server.listen();
});

describe('DatePicker', () => {
  afterEach(() => {
    queryClient.clear();
    cleanup();
  });

  test('should call onCancel when cancel button is clicked', () => {
    const callback = vi.fn();

    const screen = render(
      <QueryClientProvider client={queryClient}>
         <NewTodoForm onCancel={callback} onTodoAdded={() => {}} />
      </QueryClientProvider>
    );

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    cancelButton.click();

    expect(callback).toHaveBeenCalled();
  });

  test('should not call onTodoAdded when form is submitted with empty task name', async () => {
    const callback = vi.fn();

    const screen = render(
      <QueryClientProvider client={queryClient}>
         <NewTodoForm onCancel={() => {}} onTodoAdded={callback} />
      </QueryClientProvider>
    );

    const submitButton = await screen.findByRole('button', { name: 'Add task' });
    submitButton.click();

    expect(callback).not.toHaveBeenCalled();
  });

  test('should call onTodoAdded when form is submitted', async () => {
    const callback = vi.fn();

    const screen = render(
      <QueryClientProvider client={queryClient}>
         <NewTodoForm onCancel={() => {}} onTodoAdded={callback} />
      </QueryClientProvider>
    );

    const form = await screen.findByRole('form') as HTMLFormElement;
    const taskName = getByPlaceholderText(form, 'Task name', { exact: false }) as HTMLInputElement;

    fireEvent.input(taskName, { target: { value: 'New task' } });

    const submit = await screen.findByRole('button', { name: 'Add task' });
    submit.click();

    // we're working with async hooks here, so we need to wait for the callback to be called
    await vi.waitFor(() => expect(callback).toHaveBeenCalledOnce(), { timeout: 10000 }); 
  });
});
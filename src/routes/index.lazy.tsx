import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import TodoList from '../components/todo-list/todo-list';
import getTodosForUser from '../api/getTodos';
import TodoListLoading from '@/components/todo-list/todo-list.loading';

const USER_ID = 1;

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const { isLoading, data } = useQuery({
    queryKey: ['todos', 'inbox', USER_ID],
    queryFn: () => getTodosForUser(USER_ID),
  });

  return (
    <div className='flex flex-col gap-2 container max-w-screen-sm'>
      <h1 className='text-3xl font-bold'>Inbox</h1>
      { isLoading 
        ? <TodoListLoading /> 
        : <TodoList todos={data?.todos || []} onTodoCompleted={() => console.log('hi')} onAddTaskClicked={function (): void {
          throw new Error('Function not implemented.');
        } } />
      }
    </div>
  );
}

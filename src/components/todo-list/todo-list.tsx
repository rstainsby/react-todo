import { useState } from "react";
import { Todo } from "../../types/apiResponseTypes";
import { Button } from "../shadcn/button";
import { Check, Plus } from "lucide-react";
import NewTodoForm from "../new-todo-form/new-todo-form";

export interface TodoListProps {
  todos: Todo[];
}

const TodoList = (props: TodoListProps) => {
  const [ todos, setTodos ] = useState(props.todos);
  const [ showNewTodoForm, setShowNewTodoForm ] = useState(false);

  return (
    <ul className="flex flex-col gap-2 my-2">
      {todos.filter(todo => !todo.completed).map(todo => (
        <li key={todo.id} className="flex items-center gap-3 border-b border-neutral pt-2 pb-4 cursor-pointer text-secondary-foreground" onClick={() => todo.completed = true}>
          <button aria-label={`complete-task-${todo.id}`} name={`complete-task-${todo.id}`} className="flex justify-center items-center border border-secondary-foreground size-5 rounded-full">
            <Check className="text-muted-foreground opacity-0 mt-0.5 transition-opacity ease-in hover:opacity-100" size={16} />
          </button>
          <p>{todo.todo}</p>
        </li>
      ))}
      {
        showNewTodoForm
        ? (
          <div>
            <NewTodoForm 
              onCancel={ () => setShowNewTodoForm(false) } 
              onTodoAdded={ (newTodo) => setTodos([...todos, newTodo]) } 
            />
          </div>
        )
        : ( 
          <Button role="button" className="group w-fit bg-inherit gap-3 px-0 hover:bg-inherit" variant="ghost" size="default" onClick={() => setShowNewTodoForm(true)} >
            <Plus className="text-primary group-hover:bg-primary group-hover:rounded-full group-hover:text-background"/>
            <span className="text-muted-foreground font-normal group-hover:text-primary">Add Task</span>
          </Button>
        ) 
      }
    </ul>
  )
}

export default TodoList;
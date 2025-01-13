import { Todo } from "../../types/apiResponseTypes";
import { Button } from "../shadcn/button";
import { Check, Plus } from "lucide-react";

export interface TodoListProps {
  todos: Todo[];
  onTodoCompleted: (todoId: number) => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul className="flex flex-col gap-2 my-2">
      {props.todos.filter(todo => !todo.completed).map(todo => (
        <li key={todo.id} className="flex items-center gap-3 border border-neutral-100 p-2 cursor-pointer text-secondary-foreground" onClick={() => props.onTodoCompleted(todo.id)}>
          <button aria-label={`complete-task-${todo.id}`} name={`complete-task-${todo.id}`} className="flex justify-center items-center border border-secondary-foreground size-6 rounded-full focu">
            <Check className="text-muted-foreground opacity-0 mt-0.5 transition-opacity ease-in hover:opacity-100" size={16} />
          </button>
          <p>{todo.todo}</p>
        </li>
      ))}
      <Button role="button" className="group w-fit bg-inherit gap-3 px-3 hover:bg-inherit" variant="ghost" size="default" >
        <Plus className="text-primary group-hover:bg-primary group-hover:rounded-full group-hover:text-background"/>
        <span className="text-muted-foreground font-normal group-hover:text-primary">Add Task</span>
      </Button>
    </ul>
  )
}

export default TodoList;
import { Plus } from "lucide-react";
import { Button } from "../shadcn/button";
import { Skeleton } from "../shadcn/skeleton";

const TodoListLoading = () => {
  return (
    <ul className="flex flex-col gap-2 my-2">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Button className="w-fit" variant="link" size="default" disabled>
        <Plus />
        Add Task
      </Button>
    </ul>
  )
};

export default TodoListLoading;
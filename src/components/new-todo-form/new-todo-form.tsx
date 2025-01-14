import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../shadcn/form";
import { Input } from "../shadcn/input";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import postTodo from "@/api/postTodo";
import { Todo } from "@/types/apiResponseTypes";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../shadcn/button";
import { SendHorizonal, X } from "lucide-react";
import { Textarea } from "../shadcn/textarea";
import DatePicker from "../date-picker/date-picker";

const formSchema = z.object({
  taskName: z.string().nonempty(),
  description: z.string().optional(),
  date: date().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  project: z.string().optional(),
});

export interface NewTodoFormProps {
  onCancel: () => void;
  onTodoAdded: (todo: Todo) => void;
}

const NewTodoForm = (props: NewTodoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: '',
      description: '',
      date: undefined,
      priority: undefined,
      project: '',
    }
  });

  const mutation = useMutation({
    mutationFn: function(data: z.infer<typeof formSchema>) {
      return postTodo({
        todo: data.taskName,
        completed: false,
        userId: 1,
      })
    }
  })

  if (mutation.isSuccess) {
    props.onTodoAdded(mutation.data!);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutateAsync(data))} className="mt-3 rounded-md outline-secondary p-1 has-[:focus]:outline">
        <FormField control={form.control} name="taskName" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Task name" {...field} className="border-none font-semibold shadow-none outline-none !text-lg focus-visible:outline-none focus-visible:!shadow-none" />
            </FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem className="outline-none">
            <FormControl className="outline-none">
              <Textarea placeholder="Description" {...field} className="border-none outline-none focus-visible:outline-none !shadow-none" />
            </FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name="date" render={({ field }) => (
          <FormItem>
            <FormControl>
              <DatePicker date={field.value} onChange={(newDate) => {
                field.value = newDate;
                field.onChange(newDate);
              }} />
            </FormControl>
          </FormItem>
        )} />
        <div className="@container flex justify-end mt-3 gap-1">
          <Button role="button" variant="ghost" size="default" className="hidden @sm:block" onClick={props.onCancel}>
            Cancel
          </Button>
          <button aria-label="cancel" className="@sm:hidden flex justify-center items-center size-8">
            <X size={28}/>
          </button>
          <Button role="button" variant="default" size="default" className="hidden @sm:block" onClick={props.onCancel}>
            Add task
          </Button>
          <button aria-label="submit" type="submit" className="@sm:hidden flex justify-center items-center bg-primary rounded-sm text-background size-8">
            <SendHorizonal size={20}/>
          </button>
        </div>
      </form>
    </Form>
  )
};

export default NewTodoForm;
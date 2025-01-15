import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../shadcn/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../shadcn/button";
import { FormControl } from "../shadcn/form";
import { Calendar } from "../shadcn/calendar";
import FutureDayButton from "../future-day-button/future-day-button";

interface DatePickerProps {
  date: Date | undefined;
  onChange: (newDate: Date | undefined) => void;
  config?: {
    iconOnly: boolean;
  };
}

const DatePicker = (props: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"ghost"}
            className={cn(
              "w-min justify-start text-left font-normal px-3",
              !props.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {!props.config?.iconOnly && (
              <>
                <span className="ml-0.5">
                  { props.date ? format(props.date, "PPP") : <span>Date</span> }
                </span>
              </>
            )}
            {props.date && <Button aria-label="close" variant="ghost" className="p-0" onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              props.onChange(undefined)
            }}>
              <X/>
            </Button>
            }
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <FutureDayButton label='Tomorrow' onClick={props.onChange} />
        <FutureDayButton label='Later this week' onClick={props.onChange} />
        <FutureDayButton label='This weekend' onClick={props.onChange} />
        <FutureDayButton label='Next week' onClick={props.onChange} />
        <Calendar
          mode="single"
          selected={props.date}
          onSelect={(newDate) => props.onChange(newDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker;
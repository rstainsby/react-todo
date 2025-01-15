import { Calendar, CalendarArrowUp, Sofa, Sun } from "lucide-react";
import { Button } from "../shadcn/button";
import { format, addDays, nextSaturday, nextMonday } from "date-fns";

interface FutureDayButtonProps {
  label: FutureDateLabel;
  onClick: (value: Date) => void;
}

export type FutureDateLabel = 'Tomorrow' | 'Later this week' | 'This weekend' | 'Next week';

const FutureDayButton = ({ label, onClick }: FutureDayButtonProps) => {  
  const actualDate = getDateFromText(label);
  const formattedDate = format(actualDate, 'EEE');

  return (
    <Button variant="ghost" className="w-full flex items-center justify-between p-2" onClick={() => onClick(actualDate)}>
      <span className="flex items-center gap-3">
        { label === 'Tomorrow' && <Sun className="stroke-orange-400"/> }
        { label ===  'Later this week' && <Calendar className="stroke-purple-600" /> }
        { label === 'This weekend' && <Sofa className="stroke-blue-600" /> }
        { label === 'Next week' && <CalendarArrowUp className="stroke-purple-600" /> }
        <span>{ label }</span>
      </span>

      <span>{ formattedDate }</span>
    </Button>
  )
}

function getDateFromText(date: FutureDateLabel): Date {
  let actualDate = new Date();

  switch (date) {
    case 'Tomorrow':
      actualDate = addDays(actualDate, 1);
      break;
    case 'Later this week':
      if (actualDate.getDay() === 6 && actualDate.getHours() >= 23) { 
        // this isn't 100% accurate, it'll miss out on between 11pm and midnight, but it's good enough for now
        break;
      } else if (actualDate.getDay() === 6) {
        actualDate.setHours(23);
      } else if (actualDate.getDay() >= 5) {
        actualDate = addDays(actualDate, 1);
      } else {
        actualDate = addDays(actualDate, 3); 
      }
      break;
    case 'This weekend':
      actualDate = nextSaturday(actualDate);
      break;
    case 'Next week':
      actualDate = nextMonday(actualDate);
      break;
  }

  return actualDate;
}

export default FutureDayButton;
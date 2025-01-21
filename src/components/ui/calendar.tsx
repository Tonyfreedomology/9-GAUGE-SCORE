import * as React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalendarProps {
  mode?: "single"
  selected?: Date | null
  onSelect?: (date: Date | null) => void
  className?: string
}

const Calendar = ({
  mode = "single",
  selected,
  onSelect,
  className,
}: CalendarProps) => {
  return (
    <div className={cn("p-3 w-[280px] bg-white rounded-md", className)}>
      <DatePicker
        selected={selected}
        onChange={(date: Date) => onSelect?.(date)}
        inline
        showPopperArrow={false}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-sm font-medium">
              {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        calendarClassName="!border-none"
        wrapperClassName="!block"
        dayClassName={(date) => 
          cn(
            "!w-8 !h-8 !leading-8 !m-0.5 hover:bg-gray-100 rounded-md",
            date.toDateString() === selected?.toDateString() && "!bg-primary !text-white hover:!bg-primary"
          )
        }
      />
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
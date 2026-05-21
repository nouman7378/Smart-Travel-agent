import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** Visual styles for the trigger (border, bg, text colors) */
  className?: string;
  name?: string;
  minDate?: string;
  showIcon?: boolean;
  /** Shorter placeholder + smaller icon for narrow fields (hero, sidebar) */
  compact?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  name,
  minDate,
  showIcon = true,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(value ? new Date(value) : null);

  const popoverRef = useRef<HTMLDivElement>(null);
  const resolvedPlaceholder = placeholder ?? (compact ? 'dd/mm/yy' : 'dd/mm/yyyy');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setTempSelectedDate(new Date(value));
      setCurrentMonth(new Date(value));
    } else {
      setTempSelectedDate(null);
    }
  }, [value]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleDateClick = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setTempSelectedDate(selected);
    const year = selected.getFullYear();
    const month = String(selected.getMonth() + 1).padStart(2, '0');
    const strVal = `${year}-${month}-${String(day).padStart(2, '0')}`;
    onChange({ target: { name, value: strVal } } as unknown as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const days: React.ReactNode[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevMonthDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    days.push(
      <div key={`empty-${i}`} className="h-8 w-8 flex items-center justify-center text-gray-300 text-sm">
        {prevMonthDays - firstDayOfMonth + i + 1}
      </div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    let isDisabled = false;
    if (minDate) {
      const minParts = minDate.split('-');
      if (minParts.length === 3) {
        const minD = new Date(parseInt(minParts[0]), parseInt(minParts[1]) - 1, parseInt(minParts[2]));
        minD.setHours(0, 0, 0, 0);
        dayDate.setHours(0, 0, 0, 0);
        if (dayDate < minD) {
          isDisabled = true;
        }
      }
    }

    const isSelected =
      tempSelectedDate?.getDate() === day &&
      tempSelectedDate?.getMonth() === currentMonth.getMonth() &&
      tempSelectedDate?.getFullYear() === currentMonth.getFullYear();

    days.push(
      <button
        key={`day-${day}`}
        type="button"
        disabled={isDisabled}
        onClick={() => handleDateClick(day)}
        className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
          ${isDisabled ? 'text-gray-300 cursor-not-allowed pointer-events-none hover:bg-transparent' : isSelected ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'}`}
      >
        {day}
      </button>
    );
  }

  const totalCells = days.length;
  const remainingCells = 42 - totalCells;
  for (let i = 1; i <= remainingCells; i++) {
    days.push(
      <div key={`next-empty-${i}`} className="h-8 w-8 flex items-center justify-center text-gray-300 text-sm">
        {i}
      </div>
    );
  }

  const displayValue = value
    ? new Date(value).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: compact ? '2-digit' : 'numeric',
      })
    : '';

  const defaultTriggerClass =
    'border border-gray-300 rounded-lg bg-white text-gray-900 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent';
  const triggerClass = className.trim() || defaultTriggerClass;

  return (
    <div className="relative w-full min-w-0" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${triggerClass} w-full min-w-0 h-11 px-3 flex flex-row flex-nowrap items-center justify-between gap-1.5 text-left cursor-pointer`}
      >
        <span
          className={`flex-1 min-w-0 truncate whitespace-nowrap leading-tight ${compact ? 'text-xs' : 'text-sm'} ${displayValue ? '' : 'opacity-60'}`}
        >
          {displayValue || resolvedPlaceholder}
        </span>
        {showIcon && (
          <CalendarIcon
            className={`flex-shrink-0 pointer-events-none opacity-70 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`}
            aria-hidden
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-[999] w-72 text-gray-900">
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={handlePrevMonth} className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold text-gray-800">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button type="button" onClick={handleNextMonth} className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((d, i) => (
              <div key={i} className="text-center text-xs font-semibold text-blue-600 h-8 flex items-center justify-center">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">{days}</div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

import React from 'react';

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
}

/** 30-minute time slots — plain select, no native calendar/time picker icons */
const TIME_OPTIONS: string[] = (() => {
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
})();

const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange, className = '', id }) => (
  <select
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={
      className ||
      'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white'
    }
  >
    {TIME_OPTIONS.map((t) => (
      <option key={t} value={t}>
        {t}
      </option>
    ))}
  </select>
);

export default TimeSelect;

'use client';

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
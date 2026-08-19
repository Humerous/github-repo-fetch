import React from 'react';

const Select = ({ id, label, value, onChange, options, className }) => {
  const selectClass = className ? `${className} field` : 'field';

  return (
    <div className={selectClass}>
      <label className='label' htmlFor={id}>{label}</label>
      <div className='control'>
        <div className='select is-fullwidth'>
          <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
            {options.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Select;

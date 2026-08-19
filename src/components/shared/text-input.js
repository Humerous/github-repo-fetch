import React from 'react';

const TextInput = ({ id, label, value, onChange, placeholder, className }) => {
  const textInputClass = className ? `${className} field` : 'field';

  return (
    <div className={textInputClass}>
      <label className='label' htmlFor={id}>{label}</label>
      <div className='control'>
        <input
          id={id}
          className='input'
          type='search'
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete='off'
        />
      </div>
    </div>
  );
};

export default TextInput;

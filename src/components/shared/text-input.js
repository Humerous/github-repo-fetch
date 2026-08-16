import React from 'react';

//<--- INPUT TEXT FIELD FUNCTION --->
const TextInput = ({ label, value, onChange, placeholder, className }) => {
  const textInputClass = className ? `${className} field` : 'field';

  return (
    <div className={textInputClass}>
      <div className='control'>
        <label className='label'>{label}</label>
        <input
          className='input is-primary'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

//<--- EXPORT FUNCTION --->
export default TextInput;

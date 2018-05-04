import React from 'react';
import Select from './Select';

// for backward compatibility.
export default props => {
  const { list, ...rest } = props; // eslint-disable-line

  if (list) {
    const { value, onChange, ...restProps } = rest;
    const handleChange = (v, o) => onChange(o);
    const actualValue =
      value &&
      (Array.isArray(value)
        ? value.map(it => it[props.valueKey || 'value'])
        : value[props.valueKey || 'value']); // eslint-disable-line

    return (
      <Select
        value={actualValue}
        options={list}
        onChange={handleChange}
        {...restProps}
      />
    );
  }

  return <Select {...props} />;
};

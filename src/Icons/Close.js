import React from 'react';
import PropTypes from 'prop-types';

const Close = ({ fill, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" {...props}>
    <path
      fill={fill}
      fillRule="nonzero"
      d="M11.798 10.835L6.903 6l4.895-4.835a.72.72 0 0 0 .05-.94.559.559 0 0 0-.846-.057L6 5.108 1 .168a.56.56 0 0 0-.847.056.718.718 0 0 0 .05.941L5.098 6 .202 10.835a.72.72 0 0 0-.05.941A.575.575 0 0 0 .6 12a.568.568 0 0 0 .398-.168L6 6.892l5.002 4.94A.562.562 0 0 0 11.4 12c.165 0 .33-.076.449-.224a.72.72 0 0 0-.05-.941z"
    />
  </svg>
);

const defaultProps = {
  fill: '#000',
};

const propTypes = {
  fill: PropTypes.string,
};

Close.defaultProps = defaultProps;
Close.propTypes = propTypes;

export default Close;

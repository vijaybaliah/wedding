import React from "react";
import PropTypes from 'prop-types';

const SvgPhoneAltSolid = props => (
  <svg
    aria-hidden="true"
    data-prefix="fas"
    data-icon="phone-alt"
    className="phone-alt-solid_svg__svg-inline--fa phone-alt-solid_svg__fa-phone-alt phone-alt-solid_svg__fa-w-16"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill={props.fill}
      d="M497.39 361.8l-112-48a24 24 0 00-28 6.9l-49.6 60.6A370.66 370.66 0 01130.6 204.11l60.6-49.6a23.94 23.94 0 006.9-28l-48-112A24.16 24.16 0 00122.6.61l-104 24A24 24 0 000 48c0 256.5 207.9 464 464 464a24 24 0 0023.4-18.6l24-104a24.29 24.29 0 00-14.01-27.6z"
    />
  </svg>
);

SvgPhoneAltSolid.defaultProps = {
  fill: "currentColor"
}

SvgPhoneAltSolid.prototype = {
  fill: PropTypes.string,
}

export default SvgPhoneAltSolid;
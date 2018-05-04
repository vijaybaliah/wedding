import React from 'react'
import PropTypes from 'prop-types'

const MultiSelectValues = (props) => {
    const { values } = props
    const selectDisabledValue = props.disabled ? 'selectDisabledValue' : ''
    return (
        <span className={selectDisabledValue}
            onClick={props.disabled ? props.toggleMenu : null}>
            {
                values.length === 1 &&
                <span>{values[0].label}</span>
            }
            {
                values.length > 1 &&
                <span>{`${values[0].label}, + ${values.length - 1} more`}</span>
            }
        </span>
    )
}

MultiSelectValues.propTypes = {
    values: PropTypes.array.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default MultiSelectValues
import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../App.css';
// import SelectBox from '../../Containers/SelectBox'

const FeedSelect = (props) => {
  const { name } = props.input
  return (
    <div className={"feedSelect"}>
      <label className={"feedSelectLabel"} title={name}>{name}</label>
      <div className={"selectBoxWrapper"}>
        <input {...props.input} {...props} />
        <select {...props.input} className={"feedSelectBox"} {...props}  >
          <option />
          {
            props.options.map(item =>
              <option value={item.value} key={item.value}>{item.value}</option>
            )
          }
        </select>
      </div>
      {props.meta.touched? <span className={"fieldError"}>{props.meta.error || props.error}</span>: ''}
    </div>
  )
}

FeedSelect.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default FeedSelect

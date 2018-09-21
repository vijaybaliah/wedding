import React from 'react'
import PropTypes from 'prop-types';
import styles from '../../App.css';

const FeedImage = (props) => {
  const { imageUrl } = props
  return (
    <div className={"feedImage"}>
      <img className={"imgResponsive"} src={imageUrl} alt={imageUrl} onClick={() => props.modalOpen(imageUrl)}/>
    </div>
  )
};

FeedImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired
}

export default FeedImage;

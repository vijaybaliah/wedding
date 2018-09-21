import React from 'react';
import PropTypes from 'prop-types';
import FeedItem from './FeedItem';
import styles from '../../App.css';

const FeedMainComponent = (props) => {
  const { feedData } = props
  return (
    <div className={"feedMainContainer"}>
      {
        feedData.map(item => 
          <FeedItem 
            key={item.image_url}
            item={item}
            modalOpen={props.modalOpen}/>
      )}
    </div>
  );
};

FeedMainComponent.propTypes = {
  feedData: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
};

export default FeedMainComponent;

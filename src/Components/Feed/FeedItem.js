import React from 'react';
import PropTypes from 'prop-types';
import FeedDetailsForm from '../../Containers/MainContainer/FeedDetailsForm';
import FeedImage from './FeedImage';
import styles from '../../App.css';

const FeedItem = (props) => {
  const { item } = props
  let initialValues = {}
  try {
    item.tags.map(( item) => {
        initialValues[item.tag] = item.article_type
    })
  } catch(e) {
    console.log('set initialValues Error: ', e)
  }
  return (
    <div className={"feedItem"}>
      <FeedImage 
        imageUrl={item.image_url}
        modalOpen={props.modalOpen} />
      <FeedDetailsForm
        form={`feedDetailsForm-${item.image_url}`}
        imageUrl={item.image_url}
        tagData={item.tags}
        initialValues={initialValues} />
    </div>
  );
};

FeedItem.propTypes = {
  item: PropTypes.object.isRequired,
  modalOpen: PropTypes.func.isRequired
};

export default FeedItem;

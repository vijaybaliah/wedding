import { action } from '../utils/helper'

const initialState = {
  isLoading: true,
  error: null,
  feedData: [],
  fetchSize: 90,
  currentPage: 1,
  totalCount: 1,
};


export const fetchFeed = (payload) => action('FETCH_FEED_DATA', payload)
export const fetchFeedDataSuccess = (payload) => action('FETCH_FEED_DATA_SUCCESS', payload)
export const fetchFeedDataError = (payload) => action('FETCH_FEED_DATA_ERROR', payload)

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case 'FETCH_FEED_DATA' :
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case 'FETCH_FEED_DATA_SUCCESS' :
    case 'FETCH_FEED_DATA_ERROR' :
      return {
        ...state,
        isLoading: false,
        ...payload
      }
    default :
      return state;
  }
}

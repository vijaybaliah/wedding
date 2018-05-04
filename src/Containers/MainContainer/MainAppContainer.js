import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FeedMainComponent } from '../../Components/componentIndex';
import { fetchFeed, fetchFeedDataSuccess, fetchFeedDataError } from '../../modules/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeedData } from '../../Helpers/Api';
import Pagination from '../Pagination';
import styles from '../../App.css';
import FeedLoading from '../../Components/Feed/FeedLoading'

class MainAppContainer extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    feedData: PropTypes.array.isRequired,
    fetchSize: PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    totalCount:PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      imageUrl: ''
    }
  }

  componentDidMount() {
    this.loadFeedData(this.props.currentPage, this.props.fetchSize)
  }

  loadFeedData = (currentPage, fetchSize) => {
    this.props.fetchFeed()
    fetchFeedData(currentPage, fetchSize)
    .then(response => {
      const { data: responseData } = response
      this.props.fetchFeedDataSuccess({
        feedData: responseData.data,
        error: null,
        currentPage: currentPage,
        fetchSize: fetchSize,
        totalCount: 4502
      })
    })
    .catch(error => {
      this.props.fetchFeedDataError(error)
    })
  }

  onPageChange = (page, { sizePerPage }) => {
    this.loadFeedData(page, sizePerPage)
  }

  modalOpen = (imageUrl) => {
    this.setState({
      isOpen: true,
      imageUrl
    })
  }

  modalClose = () => {
    this.setState({
      isOpen: false,
      imageUrl: ''
    })
  }

  render() {
    const {isLoading, feedData } = this.props;
    return (
      <div>
        {
          this.state.isOpen &&
          <div className={"modalContainer"} onClick={this.modalClose}>
            <div className={"modalContainerInner"}>
              <img src={this.state.imageUrl} alt={this.state.imageUrl} />
            </div>
          </div>
        }
        {
          isLoading ?
          <FeedLoading /> :
          <FeedMainComponent 
            feedData = {feedData}
            modalOpen= {this.modalOpen} />
        }
        <div className={"paginationContainer"}>
          <Pagination 
            currentPage={this.props.currentPage}
            totalSize={this.props.totalCount}
            onChange={this.onPageChange}
            sizePerPage={this.props.fetchSize}
            sizes={[45, 90]} />
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  const { home } = state
  return {
    ...home
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchFeedDataSuccess,
  fetchFeedDataError,
  fetchFeed
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainAppContainer)

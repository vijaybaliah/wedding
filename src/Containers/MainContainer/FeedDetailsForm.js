import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import FeedSelect from '../../Components/Feed/FeedSelect'
import { ARTICLE_TYPES } from '../../Helpers/Constants'
import { updateFeedData } from '../../Helpers/Api'
import styles from '../../App.css'

class FeedDetailsForm extends Component {
  static propTypes = {
    tagData: PropTypes.array.isRequired,
    initialValues: PropTypes.object.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      updateError: null
    }
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }

  onSubmit = (data) => {
  }

  handleOnChange = (e) => {
    const { value, name } = e.target
    let payload = {
      image_url: this.props.imageUrl,
      tags: [
        {
          tag: name ? name : '',
          article_type: value ? value : ''
        }
      ]
    }
    this.setState({updateError: null})
    updateFeedData(payload)
    .then(response => {
      if (response.data && response.data.status && response.data.status.statusType === 'ERROR') {
        this.setState({updateError: response.data.status.statusMessage})
      }
    })
    .catch(error => {
    })
  }


  render() {
    const { tagData, handleSubmit } = this.props
    return (
      <div className={"feedDetailsForm"}>
        <form id={"feedDetailsForm"} onSubmit={handleSubmit(this.onSubmit)}>
          {
            tagData.map(item => <Field name={item.tag} component={FeedSelect} options={ARTICLE_TYPES} type="text" key={item.tag} onChange={this.handleOnChange}/>)
          }
        </form>
        {
          this.state.updateError &&
          <span className={"feedDetailsFormError"}>{this.state.updateError}</span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props.initialValues
  }
}


var Form = reduxForm({
  getFormState: state => state.form,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false
})(FeedDetailsForm)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Form)

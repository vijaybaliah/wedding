import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormInput } from './FormElements'

class BasicForm extends Component {

    // static propTypes = {
    // }

    onSubmit = (values) => {
        try {
            console.log('submit: ', values)
        } catch(e) {
            console.log('onSubmit: ', e)
        }
        
    }

    render() {
        const {  handleSubmit } = this.props

        return (
            <div className={'basic-form'}>
                <form id='basic' onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                        name='email'
                        placeholder='Enter your email address'
                        component={FormInput} />
                    <button>
                        submit
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
  }
}


var Form = reduxForm({
    form: 'basic',
    getFormState: state => state.form,
})(BasicForm)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Form)

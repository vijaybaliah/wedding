import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactGA from 'react-ga';
import { STROOP, STROOP_OPTIONS, STROOP_RANDOM } from '../../utils/constants';
import classnames from 'classnames';
import { Field, reduxForm, reset } from 'redux-form';
import { Helmet } from "react-helmet";
import moment from 'moment';
import store from '../../store'

const Input = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div>
      <input {...input} type={type} />
      {touched && ((error && <span className={classnames('error')}>{error}</span>) || (warning && <span className={classnames('warning')}>{warning}</span>))}
    </div>
  )
}

class StroopTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      random: false,
      timer: '',
      timeTaken: '',
      togglePopup: false,
      continueChallenge: false,
      id: Math.floor(Math.random() * 100000)
    }
  }

  componentDidMount() {
    this.setState({timer: moment()})
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  onSubmit = () => {
    const { timer, random, id } = this.state
    const start = new moment(timer)
    const end = new moment()
    const duration = moment.duration(end.diff(start))
    const timeTaken = moment.utc(moment.duration(duration).asMilliseconds()).format('mm : ss ')
    this.setState({
      timeTaken: timeTaken,
      togglePopup: true,
      continueChallenge: true
    })

    if (!random) {
      store.dispatch(reset('stroopForm'))
      ReactGA.event({
        category: 'User-' + id,
        action: 'normal',
        value: timeTaken
      })
    } else {
      ReactGA.event({
        category: 'User-' + id,
        action: 'random',
        value: timeTaken
      })
    }
  }

  closePopup = () => {
    this.setState({
      togglePopup: false,
    })
  }

  continueChallengeClick = () => {
    this.setState({
      random: true,
      continueChallenge: false,
      togglePopup: false,
      timer: moment()
    })
  }

  renderContinue = () => {
    return(
      <div className={classnames('flex', 'center')} onClick={this.continueChallengeClick}>
        <button className={classnames('stroop-submit')}>Continue Experiment</button>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props
    const { random, continueChallenge, timeTaken, togglePopup } = this.state
    const stroopData = random ? STROOP_RANDOM : STROOP
    return (
      <div>
        <Helmet>
          <meta charset="utf-8" />
          <title>Stroop Analysis</title>
          <meta name="theme-color" content="#860002" />
          <meta name="description" content="stroop analysis in react" />
          <meta name="keywords" content= "stroop analysis react, vijay udacity assignment"/>
          <meta property="og:title" content="vijay stroop analysis" />
          <meta property="og:description" content="stroop analysis react, vijay udacity assignment" />
        </Helmet>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {
            stroopData.map((color, index) =>
              <div className='flex stroop-list' key={index}>
                <div className="stroop-color-box">
                  <p className={classnames('stroop-color-box__text', color.value)}>{color.label}</p>
                </div>
                <div className='flex color-options'>
                  {
                    STROOP_OPTIONS.map(option =>
                      <div className={classnames(option + '-bg', 'flex', 'center', 'equal', 'middle')} key={option + index}>
                        <Field
                          required
                          name={color.value + index}
                          component={Input}
                          type='radio'
                          value={option}
                          validate={value => value === color.value ? undefined : 'check the color you have choosen, the color choosen should match the text ink color'} />
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }
          <div className={classnames('flex', 'center')}>
            <button className={classnames('stroop-submit')}>Finish</button>
          </div>
        </form>
        {
          togglePopup &&
          <div className={classnames('popup-bgm')}>
            <div className={classnames('popup')}>
              <p>{`Time taken to complete the test: ${timeTaken}`}</p>
              {
                continueChallenge && !random &&
                this.renderContinue()
              }
            </div>
          </div>
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


let Form = reduxForm({
  form: 'stroopForm',
  getFormState: state => state.form
})(StroopTest)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactGA from 'react-ga';
import { STROOP, STROOP_OPTIONS, STROOP_RANDOM } from '../../utils/constants';
import classnames from 'classnames';
import { Field, reduxForm, reset } from 'redux-form';
import { Helmet } from "react-helmet";
import moment from 'moment';
import store from '../../store';
import Grid from '@material-ui/core/Grid';

const Input = ({ input, label, type, index, meta: { touched, error, warning } }) => {
  return (
    <div className={classnames('relative')}>
      <input {...input} type={type} />
      {touched && index === 0 && ((error && <span className={classnames('error')}>{error}</span>) || (warning && <span className={classnames('warning', 'absolute')}>{warning}</span>))}
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
      resTime: '',
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
    const resTime = moment.duration(duration).asMilliseconds()
    this.setState({
      timeTaken,
      togglePopup: true,
      continueChallenge: true
    })

    if (!random) {
      store.dispatch(reset('stroopForm'))
      ReactGA.event({
        category: 'User-' + id,
        action: 'normal',
        label: '' + resTime,
        value: id
      })
    } else {
      ReactGA.event({
        category: 'User-' + id,
        action: 'random',
        label: '' + resTime,
        value: id
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
        <form onSubmit={handleSubmit(this.onSubmit)} className={classnames('stroop-form')}>        
          {
            stroopData.map((color, index) =>
              <div className={classnames('stroop-list')}>
                <Grid container spacing={16}>
                  <Grid item sm={2} xs={3}>
                    <div className="stroop-color-box">
                      <p className={classnames('stroop-color-box__text', color.value, 'text-center')}>{color.label}</p>
                    </div>
                  </Grid>
                  <Grid item sm={10} xs={9} className='flex color-options'>
                    {
                      STROOP_OPTIONS.map((option, i) =>
                        <div className={classnames(option + '-bg', 'flex', 'center', 'equal','middle')} key={option + index}>
                          <Field
                            required
                            name={color.value + index}
                            component={Input}
                            type='radio'
                            value={option}
                            index={i}
                            validate={value => value === color.value ? undefined : 'check the color you have choosen, the color choosen should match the text ink color'} />
                        </div>
                      )
                    }
                  </Grid>
                </Grid>
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

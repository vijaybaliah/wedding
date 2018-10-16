import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Helmet } from "react-helmet";
import classnames from 'classnames';

class StroopDescription extends Component {

  constructor(props) {
    super(props)
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
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
        <div className={classnames('stroop-description')}>
          <p className={classnames('stroop-title')}>Interactive Stroop Effect Experiment</p>
          <p>In this experiment you are required to say the color of the word, not what the word says. For example, for the word, <span className={classnames('blue')}>RED</span>, you should click on "Blue" color box radio button</p>
          <p>As soon as the words appear on your screen, choose the options as fast as you can. When you have finished, click on the "Finish" button. The time it took you to read all of the words will be shown. If you want to try the same set of words, click on the "reload" button of your browser. If you want to continue with the experiment, click on "Continue Experiment."</p>
          <Link to={'/stroop-analysis/test'}>Go to test</Link>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StroopDescription)

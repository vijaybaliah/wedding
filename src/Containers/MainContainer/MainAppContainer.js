import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

class MainAppContainer extends Component {

  constructor(props) {
    super(props)
    ReactGA.initialize('UA-72154701-5');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  handleEvent = () => {
    try {
      ReactGA.event({
        category: 'WeddingPage',
        action: 'Link Clicked',
        label: 'Link Clicked'
      })
    } catch (e) {
      console.log('event capture error')
    }
    
  }
  render() {
    return (
      <div className="weddingCover">
        <div>
        <div className="content">
          <p className="zeroMargin heading">Vijay</p>
          <p className="zeroMargin headingSmall">weds</p>
          <p className="zeroMargin heading">Kalyani</p>
          <p className="zeroMargin heading">on</p>
          <p className="zeroMargin heading">Sunday 3rd June 2018</p>
          <p className="zeroMargin headingSmall">10: 00 pm</p>
          <p className="zeroMargin headingSmall">venue:</p>
          <Link to="https://maps.google.com/maps?q=St+Michaels+Church+Anna+Nagar+4th+Street+Doovipuram+Tuticorin+Tamil+Nadu" target="blank" className="linkStyle" onClick={this.handleEvent}>St Micheal Church</Link>
        </div>
        <img className="weddingImage" src={'./images/red-wedding-card.jpg'} alt="wedding background" style={{height: `${window.innerHeight}px`}}/>
        <div className="heartContainer">
          <img src={"./images/weddingheart.png"} alt="weddingheart"/>
        </div>
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
)(MainAppContainer)

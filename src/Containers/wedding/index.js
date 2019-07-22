import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Helmet } from "react-helmet";

class Wedding extends Component {

  constructor(props) {
    super(props)
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
        <Helmet>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#860002" />
          <meta property="og:image" content="http://vijay1989.com/images/webcover.png" />
          <meta name="description" content="Request your esteemed presence with your family & friends on the occasion of my marriage" />
          <meta name="keywords" content= "vijay balu wedding Invitation, vijay wedding, kalyani wedding, vijay weds kalyani, kalyani wedding invitaion"/>
          <meta property="og:title" content="Vijay weds Kalyani Invitation" />
          <meta property="og:description" content="Request your esteemed presence with your family & friends on the occasion of my marriage" />
        </Helmet>
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
        <img className="weddingImage" src={'/images/red-wedding-card.jpg'} alt="wedding background" style={{height: `${window.innerHeight}px`}}/>
        <div className="heartContainer">
          <img src={"/images/weddingheart.png"} alt="weddingheart"/>
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
)(Wedding)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class MainAppContainer extends Component {


  handleEvent = () => {
    console.log('clicked')
    try {
      window.ga('send', 'event', 'WeddingPage', 'LinkClicked', 'LinkClicked')
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
          <Link to="https://www.google.co.in/maps/dir/''/anna+nagar+church+tuticorin/@8.8053615,78.0611874,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b03efeb0c18b995:0x5497b4e8a58719a5!2m2!1d78.131228!2d8.805368" target="blank" className="linkStyle" onClick={this.handleEvent}>St Micheal Church</Link>
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

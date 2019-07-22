import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Helmet } from "react-helmet";
import classnames from 'classnames';
import Experiences from './Experiences';
import AboutMe from './AboutMe';
import ContactDetails from './ContactDetails';

class Profile extends Component {

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <div
        className={classnames('home')}
      >
        <Helmet>
          <meta charset="utf-8" />
          <title>Vijay Profile : Front End Developer Voonik, frontend developer mrvoonik, frontenddeveloper, front end developer</title>
          <meta name="theme-color" content="#860002" />
          <meta name="description" content="Front end developer with 3 years of experience in react, javascript and node.js environment" />
          <meta name="keywords" content= "Front End Developer, vijay, vijay balu, vijaybalu, frontenddeveloper, vijay profile"/>
          <meta property="og:title" content="Vijay Profile : Front End Developer Voonik, frontend developer mrvoonik, frontenddeveloper, front end developer" />
          <meta property="og:description" content="Front end developer with 3 years of experience in react, javascript and node.js environment" />
        </Helmet>
        <div
          className={classnames('my-profile')}
        >
          <AboutMe />
          <Experiences />
          <ContactDetails />
        </div>
    </div>
    )
  }

}

export default Profile
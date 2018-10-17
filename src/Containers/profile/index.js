import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactGA from 'react-ga';
import { Helmet } from "react-helmet";
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

class Profile extends Component {

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Grid container spacing={12}>
        <Helmet>
          <meta charset="utf-8" />
          <title>Vijay Profile : Front End Developer Voonik, frontend developer mrvoonik, frontenddeveloper, front end developer</title>
          <meta name="theme-color" content="#860002" />
          <meta name="description" content="Front end developer with 3 years of experience in react, javascript and node.js environment" />
          <meta name="keywords" content= "Front End Developer, vijay, vijay balu, vijaybalu, frontenddeveloper, vijay profile"/>
          <meta property="og:title" content="Vijay Profile : Front End Developer Voonik, frontend developer mrvoonik, frontenddeveloper, front end developer" />
          <meta property="og:description" content="Front end developer with 3 years of experience in react, javascript and node.js environment" />
        </Helmet>
        <Grid item sm={4} xs={12}>
          <div className={classnames('flex', 'center', 'middle')}>
            <img className={classnames('profile-img')} src={'./images/profile-photo.jpg'} alt={'vijay profile'}/>
          </div>
        </Grid>
        <Grid item sm={8} xs={12}>
          <h1 className={classnames('heading')}>About Myself</h1>
          <p>Currently I am working as a front end developer in voonik on web and mobile website development. I have one year experience in web application development. Prior to this, I worked as a project engineer in Wipro Technologies for a period of about 8 months.</p>
          <p>I have hands on experience in React, Redux, Node.js, Ruby on Rails, Jquery, Ajax, Javascript, Mysql, Html and Css</p>
          <p>I have completed my MBA from National Institute of Technology, Tiruchirapalli. My under graduation is in Electronics and Electrical Engineering from Crescent Engineering College</p>
        </Grid>
        <Grid item xs={12}>
          <div className={classnames('flex', 'between', 'padding24')}>
            <div><p><b>Project Name:</b> TicTacToe</p></div>
            <div><p className={classnames("text-right projDate")}>2014 (Dec) to 2015 (Apr)</p></div>
          </div>
        </Grid>
        <Grid item sm={4} xs={12}>
          <div className={classnames('flex', 'center', 'middle')}>
            <img className={classnames('tic-tac-toe-img')} src={'./images/ic.jpg'} alt={'vijay tic tac toe app'} />
          </div>
        </Grid>
        <Grid item sm={8} xs={12}>
          <p><b>Project Description: </b>The aim of this project is to design a two player board game, TicTacToe. The player who succeeds in placing three respective marks in a horizontal, vertical, or diagonal line wins.</p>
          <ul>
            <li>Developed the algorithm for the game.</li>
            <li>Designed interactive user Interface in XML.</li>
            <li>Developed java code to recognise the player’s turn and decide the winning criteria.</li>
            <li>Developed test cases for fixing errors.</li>
            <li>Published application in playstore.</li>
          </ul>
          <p><b>Skill Utilised: </b>Android, Java, XML</p>
          <p></p>
        </Grid>
        <div className="flex full-width padding24">
          <div><p><b>Company Name: </b>Wipro Technologies, Chennai</p> </div>
          <div><p>2012 (Dec) to 2013 (Aug)</p></div>
        </div>
        <div className="flex padding24">
          <div>
            <p><b>Designation: </b>Project Engineer</p>
            <p><b>Project Description: </b>MyWipro App helps the employees to keep track of their attendance, leaves applied, leaves approvals, time of logging, access to eResources. Objective of the application implementation is to handle attendance tracking and pay out processing of the employees based on their attendance.</p>
            <ul>
              <li>Designed and developed the android application based on the desired requirements.</li>
              <li>Designed attractive interface using xml</li>
              <li>Developed new features to the application using java</li>
              <li>Exported data to SQL server to produce flat file source</li>
              <li>Experience in handling software specifications document, prepared test cases and code review</li>
            </ul>
            <p><b>Skills Utilised: </b>Android, Java, XML, SQL, Git</p>
            <p><b>Additional qualifications:</b></p>
            <ul>
              <li>Java, C++, Java Script, XML, HTML,CSS, SQL</li>
              <li>R Programming (open course ware -Coursera certified)</li>
              <li>Data Scientist Toolbox (open course ware -Coursera certified)</li>
              <li>Hadoop Fundamentals (BigdataUniversity certified)</li>
            </ul>
          </div>
        </div>
        <div className="full-width padding24">
          <h3>Contact Details</h3>
          <hr/>
          <h4>Phone No:</h4>
          <p>9444886277</p>
          <h4>E Mail</h4>
          <p>vijaybalu1989@gmail.com</p>
        </div>
    </Grid>
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
)(Profile)

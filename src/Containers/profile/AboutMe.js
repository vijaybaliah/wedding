import React from 'react';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

const AboutMe = (props) => {
  return (
    <Grid
      container
      spacing={16}
      className={classnames('container about-me')}
      alignItems="flex-start"
    >
      <Grid
        item
        sm={4}
        xs={12}
      >
        <div className={classnames('flex', 'start', 'middle')}>
          <img className={classnames('profile-img')} src={'./images/profile-photo.jpg'} alt={'vijay profile'}/>
        </div>
      </Grid>
      <Grid
        item
        sm={8}
        xs={12}
      >
        <h1 className={classnames('heading')}>About Myself</h1>
        <p>Currently, I am working as a software developer with Myntra.com on web and mobile website development. I have more than 4 years of experience on the eCommerce domain and have worked on cross-browser compatibility.</p>
        <p>I have hands-on experience in React.js, Redux, Graphql, Node.js, Ruby on Rails, Jquery, Ajax, Javascript, Mysql, Html and CSS.</p>
        <p>I have completed my MBA from National Institute of Technology, Tiruchirapalli. My under graduation is in Electronics and Electrical Engineering from Crescent Engineering College.</p>
      </Grid>
    </Grid>
  )
}

export default AboutMe

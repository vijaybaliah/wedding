import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

const Skills = (props) => {
  return (
    <Grid item sm={12} xs={12}>
      <p className={classnames('skills')}>Skills Utilised:</p>
      {
        props.skills.map((skill, index) => <span key={skill}>{index === 0 ? skill: ', ' + skill}</span>)
      }
    </Grid>
  )
}

Skills.propTypes = {
  skills: PropTypes.array.isRequired,
}

export default Skills

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

const CompanyProfile = (props) => {
  return (
    <Grid item sm={12} xs={12}>
      <p className={classnames('company')}>
        <a href={props.url} target='_blank'>{props.company}</a>
      </p>
      <p>{props.date}</p>
    </Grid>
  )
}

CompanyProfile.propTypes = {
  company: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default CompanyProfile

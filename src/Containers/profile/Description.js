import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

const Description = (props) => {
  return (
    <Grid
      container
      spacing={16}
      className={classnames('container')}
      alignItems="flex-start"
    >
      <Grid item xs={12} sm={4}>
        <p className={classnames('projectName')}>{props.projectName}</p>
        <p className={classnames('note')}>{props.note}</p>
      </Grid>
      <Grid item xs={12} sm={8}>
        <p className={classnames('description')}>{props.description}</p>
      </Grid>
    </Grid>
  )
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  note: PropTypes.string,
}

export default Description

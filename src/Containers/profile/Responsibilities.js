import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const Responsibilities = (props) => {
  return (
    <Grid item sm={12} xs={12}>
      <ul>
        {
          props.responsibilities.map(responsibility => <li key={responsibility}>{responsibility}</li>)
        }
      </ul>
    </Grid>
  )
}

Responsibilities.propTypes = {
  responsibilities: PropTypes.array.isRequired,
}

export default Responsibilities

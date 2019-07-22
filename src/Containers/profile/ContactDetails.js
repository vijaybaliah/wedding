import React from 'react';
import { contactDetails } from '../../data/response'
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '../../Icons/GithubBrands';
import HackerrankIcon from '../../Icons/HackerrankBrands';
import LinkedInIcon from '../../Icons/LinkedinBrands';
import PhoneIcon from '../../Icons/Phone';
import EmailIcon from '../../Icons/Email';

const ContactDetails = (props) => {
  return (
    <Grid
      container
      className={classnames('container contact-detail-container')}
      alignItems="flex-start"
    >
      <Grid item sm={6} xs={12}>
        <p className={classnames('section-title')}>Contact Details</p>
        <div className={classnames('flex middle contact-list')}>
          <a href={`mailto:${contactDetails.email}?Subject=Sourcing Web Profile`} target="_top">
            <span className={classnames('contact-icon')}>
              <EmailIcon width={24} height={24} fill={'rgba(245, 255, 254, 0.75)'} />
            </span>
          </a>
          <a href={`mailto:${contactDetails.email}?Subject=Sourcing Web Profile`} target="_top"
            className={classnames('contact-details')}>
            <span>{contactDetails.email}</span>
          </a>
        </div>
        <div className={classnames('flex middle contact-list')}>
          <a href={`tel:${contactDetails.phone}`} target="_top">
            <span className={classnames('contact-icon')}>
              <PhoneIcon width={24} height={24} fill={'rgba(245, 255, 254, 0.75)'} />
            </span>
          </a>
          <a href={`tel:${contactDetails.phone}`} target="_top" className={classnames('contact-details')}>
            <span>{contactDetails.phone}</span>
          </a>
        </div>
      </Grid>
      <Grid item sm={6} xs={12} className={classnames('social-media-section')}>
        <div>
          <p className={classnames('section-title')}>Social Media</p>
          <div className={classnames('social-media-section')}>
            <a href={contactDetails.hackerrank} target="_blank" className={classnames('social-icons')}>
              <HackerrankIcon width={24} height={24} fill={'rgba(245, 255, 254, 0.75)'} />
            </a>
            <a href={contactDetails.github} target="_blank" className={classnames('social-icons')}>
              <GitHubIcon width={24} height={24} fill={'rgba(245, 255, 254, 0.75)'} />
            </a>
            <a href={contactDetails.linkedIn} target="_blank" className={classnames('social-icons')}>
              <LinkedInIcon width={24} height={24} fill={'rgba(245, 255, 254, 0.75)'} />
            </a>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default ContactDetails

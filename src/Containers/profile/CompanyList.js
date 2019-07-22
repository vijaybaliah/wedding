import React from 'react';
import classnames from 'classnames';
import { companies } from '../../data/response';

const CompanyList = (props) => {
  return (
    <div className={classnames('company-list flex middle around')}>
      {
        companies.map(company => {
          return(
            <div key={company.name}>
              <a href={company.url} target={'_blank'}>
                <img src={company.logo} alt={company.name} />
                <p>{company.name}</p>
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

export default CompanyList

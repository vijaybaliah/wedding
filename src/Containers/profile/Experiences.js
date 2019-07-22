import React from 'react';
import classnames from 'classnames';
import CompanyProfile from './CompanyProfile';
import Description from './Description';
import Responsibilities from './Responsibilities';
import CompanyList from './CompanyList';
import Skills from './Skills';
import { experiences } from '../../data/response';


const Experiences = (props) => {
  return (
    <div className={classnames('experiences')}>
      <p className={classnames('work-exp')}>
        Work Experience
      </p>
      <CompanyList />
      {
        experiences.map(experience => {
          return (
            <div key={experience.company}>
              <CompanyProfile
                company={experience.company}
                date={experience.date}
                url={experience.url}
              />
              {
                experience.projects.map(project => {
                  return(
                    <div
                      key={project.projectName}
                      className={classnames('description-container')}
                    >
                      <Description
                        projectName={project.projectName}
                        description={project.description}
                        note={project.note}
                      />
                      <Responsibilities
                        responsibilities={project.responsibilities}
                      />
                      <Skills
                        skills={project.skills}
                      />
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Experiences

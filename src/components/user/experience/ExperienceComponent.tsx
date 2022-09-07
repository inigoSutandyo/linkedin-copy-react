import React from 'react'
import SubDate from '../SubDate'
import SubDetail from '../SubDetail'

type Props = {
    experience: Experience
}

const ExperienceComponent = (props: Props) => {
  return (
    <div className='d-flex flex-column border-bottom-light m-3' style={{
        width: "95%"
      }}>    
          <h3>{props.experience.title}</h3>

          <SubDetail data={props.experience.company} prefix='Company:' suffix=''/>
          <SubDetail data={props.experience.employmenttype} prefix='Employment Type:' suffix=''/>
          {props.experience.isworking ? (
            <SubDetail data={"Currenlty Working Here"} prefix='Status:' suffix=''/>
          ) : (
           <></> 
          )}
          <SubDate end={new Date(props.experience.end)} start={new Date(props.experience.start)} />
      </div>
  )
}

export default ExperienceComponent
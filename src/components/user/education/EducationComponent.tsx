import React, {useState, useEffect} from 'react'
import EducationDate from './EducationDate'
import EducationDetail from './EducationDetail'

type Props = {
  education: Education
}

const EducationComponent = (prop: Props) => {
  
  


  return (
    <div className='d-flex flex-column border-bottom-light m-3' style={{
      width: "95%"
    }}>    
        <h3>{prop.education.institute}</h3>

        <EducationDetail data={prop.education.degree} prefix='Degree:' suffix=''/>
        <EducationDetail data={prop.education.fieldofstudy} prefix='Field of Study:' suffix=''/>
        <EducationDate end={new Date(prop.education.end)} start={new Date(prop.education.start)} />
    </div>
  )
}

export default EducationComponent
import React, {useState, useEffect} from 'react'
import SubDate from '../profile/SubDate'
import EducationDate from '../profile/SubDate'
import SubDetail from '../profile/SubDetail'

type Props = {
  education: Education
}

const EducationComponent = (prop: Props) => {
  
  


  return (
    <div className='d-flex flex-column border-bottom-light m-3' style={{
      width: "95%"
    }}>    
        <h3>{prop.education.institute}</h3>

        <SubDetail data={prop.education.degree} prefix='Degree:' suffix=''/>
        <SubDetail data={prop.education.fieldofstudy} prefix='Field of Study:' suffix=''/>
        <SubDate end={new Date(prop.education.end)} start={new Date(prop.education.start)} />
    </div>
  )
}

export default EducationComponent
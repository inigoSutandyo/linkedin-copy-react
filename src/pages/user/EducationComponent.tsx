import React, {useState, useEffect} from 'react'

type Props = {
  education: Education
}

const EducationComponent = (prop: Props) => {
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()
  const months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  useEffect(() => {
    setStart(new Date(prop.education.start))
    setEnd(new Date(prop.education.end))
  }, [])
  


  return (
    <div className='d-flex flex-column w-10'>    
        <h3>{prop.education.institute}</h3>
        
        <div className='d-flex align-center justify-between w-2'>
          {start?.getFullYear() && start?.getFullYear() >= 1922 ? (
            <div>
              <p className='color-light'>{months[start?.getMonth()]} {start?.getFullYear()}</p>
            </div>
          ) : <></>}

          {end?.getFullYear() && end?.getFullYear() >= 1922 ? (
            <div>
              <p className='color-light'>{months[end?.getMonth()]} {end?.getFullYear()}</p>
            </div>
          ) : <></>}
        </div>

        {prop.education.description ? (
          <div className='d-flex'>
            <p className='color-light'>{prop.education.description}</p>
          </div>
        ) : <></>}
    </div>
  )
}

export default EducationComponent
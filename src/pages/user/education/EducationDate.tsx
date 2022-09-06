import React, { useEffect, useState } from 'react'

type Props = {
    start: Date,
    end: Date
}

const EducationDate = (props: Props) => {
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
  
    if (props.start && props.start.getFullYear() >= 1922)  {
      setStart(props.start)
    }

    console.log(start)
    if (props.end && props.end.getFullYear() >= 1922)  {
      setEnd(props.end)
    }
  }, [props])

  return (
    <>
      <div className='d-flex align-center mt-1'>
          {start ? (
              <div className='mr-5'>
                <p>Start</p>
                <p className='color-light'>{months[start.getMonth()]} {start.getFullYear()}</p>
              </div>
          ) : <></>}

          {end ? (
              <div className='mr-5'>
                <p>End</p>
                <p className='color-light'>{months[end.getMonth()]} {end.getFullYear()}</p>
              </div>
          ) : <></>}
      </div>
    </>
  )
}

export default EducationDate
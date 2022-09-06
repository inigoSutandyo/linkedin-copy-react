import React from 'react'
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory'

type Props = {
  data: string
  prefix: string
  suffix: string
}

const EducationDetail = (props: Props) => {
  return (
    <>
        {props.data ? (
            <div className='d-flex'>
                <p className='color-light'>{props.prefix} {props.data} {props.suffix}</p>
            </div>
        ) : <></>}
    </>
  )
}

export default EducationDetail
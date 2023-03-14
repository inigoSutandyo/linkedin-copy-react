import React from 'react'
import '../../styles/components/spinner.scss'
type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="lds-facebook"><div></div><div></div><div></div></div>
  )
}

export default Loading
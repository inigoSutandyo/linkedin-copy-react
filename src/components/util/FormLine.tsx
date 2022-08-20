import React from 'react'

type Props = {}

// use in a form with form.css
const FormLine = (props: Props) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    color: "#B6B9BC",
    justifyContent: "space-between"
  }

  const lineStyle = {
    width: "40%"
  }
  return (
    <div style={containerStyle}>
        <div style={lineStyle}>
            <hr/> 
        </div>
        or 
        <div style={lineStyle}>
            <hr/> 
        </div>
    </div>
  )
}

export default FormLine
import React from 'react'

interface Props {
    message: string
}

const ErrorComponent = (props: Props) => {
    return (
        <div style={{
            backgroundColor: "rgb(255,114,118)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
        }}>
            <p style={{
                fontSize: "16px",
                margin: "4px"
            }}>{props.message}</p>
        </div>
    )
}

export default ErrorComponent
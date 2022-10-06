import React from 'react'
import '../../styles/forms/form.scss'
type Props = {
    inviteConnect: any
    destination: User
    closeModal: any
}

const ConnectPrompt = (props: Props) => {
  const invite = () => {
    const target = document.getElementById('msg') as HTMLInputElement
    props.inviteConnect(target.value.trim())
  }
  return (
    <div>
        <h3>Connect to {props.destination.firstname} {props.destination.lastname} ?</h3>
        <div className='input-container'>
            <textarea name="" id="msg" cols={20} rows={3} style={{
                resize: "none"
            }} placeholder='Additional Message'></textarea>
        </div>
        <div className="submit-container justify-start">
            <button
                className='btn-primary w-1'
                style={{
                    borderRadius: "16px",
                }}
                onClick={invite}
            >
                Yes
            </button>
            <button
                className='btn-primary-outline w-1 mx-2'
                style={{
                    borderRadius: "16px",
                }}
                onClick={props.closeModal}
            >
                No
            </button>
        </div>
    </div>
  )
}

export default ConnectPrompt
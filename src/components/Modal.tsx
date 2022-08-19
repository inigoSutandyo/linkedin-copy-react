import React, { ReactNode } from 'react'
import '../styles/components/modal.css'
import { IconContext } from 'react-icons'
import {FaWindowClose} from "react-icons/fa"
interface Props {
    open: boolean
    child: ReactNode
    title: string
    closeModal: any
}

const Modal = (props: Props) => {
    const iconStyle = {
        color: "red",
        size: "25px",
    }
    return (
        <>
            {props.open ? (
                <div className='modal'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>{props.title}</h4>
                            <IconContext.Provider value={iconStyle} >
                                <FaWindowClose onClick={props.closeModal} style={{
                                    cursor: "pointer"
                                }}/>
                            </IconContext.Provider>
                        </div>
                        <div className='modal-body'>
                            {props.child}
                        </div>
                    </div>
                </div>
            ) : <></>}
        </>
    )
}

export default Modal
import React, { ReactNode, useEffect } from 'react'
import '../styles/components/modal.css'
import { IconContext } from 'react-icons'
import {FaWindowClose} from "react-icons/fa"
import ReactModal from 'react-modal'
import {AiOutlineClose} from 'react-icons/ai'
interface Props {
    isOpen: boolean
    children: ReactNode
    contentLabel: string
    closeModal: any
    appElement: any
}

const ModalComponent = (props: Props) => {

    useEffect(() => {
      ReactModal.setAppElement(props.appElement)
    }, [])
    
    return (
        <ReactModal
            isOpen = {props.isOpen}
            contentLabel={props.contentLabel}
            onRequestClose={props.closeModal}
            ariaHideApp={false}
            className="modal"
            overlayClassName={"overlay"}
        >
            <div className='modal-header'>
                <h3>{props.contentLabel}</h3>
                <div onClick={props.closeModal} className="close-modal">
                    <IconContext.Provider value={{
                        color: "black",
                        size: "25px"
                    }}>
                        <AiOutlineClose/>
                    </IconContext.Provider>
                </div>
            </div>
            <div className='modal-body'>
                {props.children}
            </div>
        </ReactModal>
    )
}

export default ModalComponent
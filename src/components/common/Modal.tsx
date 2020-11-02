import React, {Dispatch, SetStateAction} from "react";

type ModalPropsType = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
}

const Modal = (props: ModalPropsType) => {
  return (
    <div className={"modal-container"}>
      <div className={"modal"}>
        <div className={"modal-content"}>
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className={"modal-footer"}>
          <a href="#!"
             className="modal-close waves-effect waves-green btn-flat">
            Agree
          </a>
          <a href="#!"
             className="modal-close waves-effect waves-green btn-flat"
             onClick={() => props.setIsModalOpen(false)}>
            Dismiss
          </a>
        </div>
      </div>
    </div>

  )
}

export default Modal


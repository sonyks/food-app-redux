import { ModalProps } from "../../models/modal-props.model";
import "./Modal.scss";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

const Backdrop = (props: ModalProps) => {
  return <div className="backdrop" onClick={props.onClose}></div>;
};

const ModalOverlay = (props: ModalProps) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const modalRoot = document.querySelector("#overlays") as HTMLElement;
export const Modal = (props: ModalProps) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const current = el.current;

    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, el.current)}
      {createPortal(
        <ModalOverlay onClose={props.onClose} children={props.children} />,
        el.current
      )}
    </>
  );
};

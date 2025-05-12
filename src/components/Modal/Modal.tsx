"use client";

import { setAllModalsFalse } from "@/helpers/modalHandlers";
import classes from "./Modal.module.css";
import ReactDom from "react-dom";
import Close from "@/assets/SvgIcons/Close";

const BackDrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal} style={props.style}>
      <Close onClick={() => props.onClick()} />
      <div>{props.body}</div>
    </div>
  );
};

const backdropContainer =
  typeof document !== "undefined" && document.getElementById("backdrop");
const modalOverlay =
  typeof document !== "undefined" && document.getElementById("modal-overlay");

const Modal = (props: any) => {
  return (
    <div className={classes.container}>
      {ReactDom.createPortal(
        <BackDrop
          onClick={() => {
            if (props?.setState) {
              setAllModalsFalse(props?.setState);
            }
            props?.onClick();
          }}
        />,
        backdropContainer || document.body
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          header={props.header}
          body={props.body}
          style={props.style}
          onClick={props.onClick}
        />,
        modalOverlay || document.body
      )}
    </div>
  );
};

export default Modal;

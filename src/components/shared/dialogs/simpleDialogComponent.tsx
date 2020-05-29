import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

function SimpleDialogComponent({
  onClose,
  open,
  headerText,
  contentText,
  closeButtonText,
  isError,
  children,
  size,
  ...props
}: any) {
  const [closeDialog, setCloseDialog] = useState(false);

  useEffect(() => {
    setCloseDialog(!open);
  }, [open]);

  const handleClose = () => {
    console.log("setting");
    setCloseDialog(true);
    onClose && onClose();
  };

  return (
    <MDBContainer>
      <MDBModal
        isOpen={open && !closeDialog}
        {...props}
        centered
        size={size ? "lg" : "md"}
      >
        <MDBModalHeader className="align-center">{headerText}</MDBModalHeader>
        <MDBModalBody style={isError ? { color: "red" } : null}>
          {contentText || children}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={handleClose}>
            {closeButtonText || "close"}
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}

SimpleDialogComponent.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.any,
  open: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
  headerText: PropTypes.string.isRequired,
  contentText: PropTypes.string,
  closeButtonText: PropTypes.string,
  size: PropTypes.string,
};

export default SimpleDialogComponent;

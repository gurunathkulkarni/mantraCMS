import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
// import Button from "../Button/Button";

class CommonModal extends Component {
  render() {
    const { show, onHide, children, onSubmit, title, size } = this.props;
    return (
      <>
        <Modal size={size} centered show={show} onHide={onHide}>
          <Modal.Header closeButton>{title}</Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          {/* <Modal.Footer>
            <Button title="Cancel" color="danger" onClick={onHide} />
            <Button title="Submit" color="success" onClick={onHide} />
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
}

CommonModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
};

export default CommonModal;

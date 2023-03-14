import React from "react";
import { Button, Modal } from "react-bootstrap";
import { BASE_URL } from "../utils/apiConstant";
import { deleteMethod, put } from "../utils/apiMethods";

const DeleteModal = ({ show, onHide, title, data, onDone, categoryId }) => {
  // console.log("DELETE", data);
  const onDelete = async () => {
    let url = "";
    if (title === "Category") {
      url = `${BASE_URL}/category/${data._id}`;
      deleteData(url);
    } else if (title === "Sub-Category") {
      url = `${BASE_URL}/category/${categoryId}/subCategory/${data._id}`;
      deleteData(url);
    } else {
      const URL = `${BASE_URL}/category/${data.categoryId}/subCategory/details`;

      const reqObj = {
        id: data.subCatId,
        details: ``,
      };

      await put(URL, reqObj);
      onDone();
      onHide();
    }
  };

  const deleteData = async (url) => {
    await deleteMethod(url);
    onDone();
    onHide();
  };
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>{title} Delete</Modal.Header>
      <Modal.Body>Are you sure want to Delete {title}?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          {" "}
          Cancel
        </Button>
        <Button title="Delete" variant="success" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

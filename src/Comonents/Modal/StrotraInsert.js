import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
class StrotraInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: [""],
    };
  }

  onParaCount = (count) => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push("");
    }
    this.setState({ formValue: array });
  };

  componentDidMount() {
    const { show, onHide, children, onSubmit, title, size, type, data } =
      this.props;
    const array = [];
    if (type === "edit") {
      data && data.forEach((itm) => array.push(itm));
      this.setState({ formValue: array });
    }
  }

  onChange = (value, index) => {
    const array = [...this.state.formValue];
    array[index] = value;
    this.setState({ formValue: array });
  };
  render() {
    const { show, onHide, children, onSubmit, title, size, type, data } =
      this.props;
    const { formValue } = this.state;

    return (
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {type === "edit" ? "Update" : "Add"} Strotras
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <label style={{ fontWeight: "bold", padding: "15px" }}>
              Number of Paragraphs
            </label>
            <input
              defaultValue={1}
              className="form-control w-50"
              type="number"
              onChange={(e) => this.onParaCount(e.target.value)}
            />
          </div>
          <div style={{ maxHeight: "400px", overflow: "auto" }}>
            {formValue.map((data, index) => (
              <>
                <div
                  style={{
                    padding: "15px",
                    paddingBottom: "0px",
                    paddingTop: "0px",
                  }}
                >
                  <label style={{ fontWeight: "bold", padding: "15px" }}>
                    Paragraph {index + 1}
                  </label>
                  <textarea
                    name="paragraphData"
                    className="form-control"
                    placeholder="Enter Strotra"
                    value={formValue[index]}
                    autocomplete="off"
                    onChange={(e) => this.onChange(e.target.value, index)}
                  />
                </div>
              </>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={onHide} className="btn btn-danger">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(formValue)}
            className="btn btn-success"
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default StrotraInsert;

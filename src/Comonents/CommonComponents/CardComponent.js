import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function cardComponent(props) {
  const {
    item,
    image,
    title,
    content,
    isButton,
    buttonText,
    buttonClick,
    isCategory,
    details,
    onEdit,
    onDelete,
    isSelected = false,
  } = props;
  let days = "";
  if (isCategory) {
    days = JSON.parse(details.day);
  }

  return (
    <Card
      style={{
        width: "100%",
        margin: "10px 0px",
        background: isSelected ? "green" : "white",
      }}
      onClick={() => {
        buttonClick(item);
      }}
    >
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {content && (
          <div className="subDiv" style={{ display: isCategory && "flex" }}>
            {image && (
              <Card.Img variant="top" src={image} style={{ width: "30%" }} />
            )}

            {!isCategory ? (
              <div
                style={{ justifyContent: "space-between" }}
                className="d-flex"
              >
                <div>
                  <Card.Text
                    style={{
                      marginLeft: "20px",
                      color: isSelected ? "white" : "black",
                    }}
                  >
                    {content}
                  </Card.Text>
                </div>
                <div>
                  <button
                    onClick={() => onEdit(item)}
                    data-bs-toggle="tooltip"
                    title="Edit"
                    className="round-btn primary-col"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>

                  <button
                    onClick={() => onDelete(item)}
                    data-bs-toggle="tooltip"
                    title="Delete"
                    className="round-btn primary-col"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "left",
                  marginLeft: "10px",
                  color: isSelected ? "white" : "black",
                }}
              >
                <p className="card-title">
                  {`${details.categoryTitle}`} ({details.categoryName}){" "}
                </p>
                <p style={{ width: "240px" }}>
                  Days :{days && days.map((data) => <span>{data},</span>)}
                </p>
                <button
                  onClick={() => onEdit(details)}
                  data-bs-toggle="tooltip"
                  title="Edit"
                  className="round-btn primary-col"
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>

                <button
                  onClick={() => onDelete(details)}
                  data-bs-toggle="tooltip"
                  title="Delete"
                  className="round-btn primary-col"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            )}
          </div>
        )}
        {isButton && (
          <Button onClick={() => buttonClick()} variant="primary">
            {buttonText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

import React, { useState, useEffect } from "react";
import { SUB_CATEGORY_URL } from "../utils/apiConstant";
import { put } from "../utils/apiMethods";
import CommonModal from "./Commonmodal";

const EdittSubCat = ({ show, onHide, data, langId, onUpdate, categoryId }) => {
  const [subcategoryName, setSubCategoryName] = useState();
  const [subcategoryTitle, setsubcategoryTitle] = useState();
  const userhandler = (e) => {
    const { name, value } = e.target;
    if (name === "subcategoryName") {
      setSubCategoryName(value);
    } else if (name === "subcategoryTitle") {
      setsubcategoryTitle(value);
    }
  };
  console.log("subdata", data);

  useEffect(() => {
    setSubCategoryName(data.sub_category_name);
    setsubcategoryTitle(data.sub_category_title);
  }, [data]);

  const handleSubCatSubmit = async () => {
    if (subcategoryName === "") {
      alert("please add subCategory / mantra name");
    } else if (subcategoryTitle === "") {
      alert("please add subCategory title / regional mantra name");
    } else {
      const reqObj = {
        sub_category_name: subcategoryName,
        sub_category_title: subcategoryTitle,
        id: data._id,
      };
      const url = SUB_CATEGORY_URL.replace("<SUB_CATEGORY_ID>", categoryId);
      const response = await put(url, reqObj);
      if (
        response &&
        response.message.toLowerCase().includes("updated successfully")
      ) {
        onUpdate(response.data);
        onHide();
      } else {
        alert("Some thing went wrong please check api response in network");
      }
    }
  };
  return (
    <CommonModal
      show={show}
      title="Edit Sub Category"
      onHide={() => onHide(false)}
    >
      <div className="container ">
        <div className="row  d-flex justify-conteny">
          <div className="col">
            <label className="color " for="formGroupExampleInput">
              sub category Name/ mantra name
            </label>
            <input
              onChange={userhandler}
              class="form-control m-2"
              type="text"
              placeholder="category Name/ Gods name"
              name="subcategoryName"
              value={subcategoryName}
            />
          </div>
        </div>
        <div className="row  d-flex justify-conteny">
          <div className="col">
            <label className="color " for="formGroupExampleInput">
              sub category title/ mantra title
            </label>
            <input
              onChange={userhandler}
              class="form-control m-2"
              type="text"
              placeholder="category Name in regional lang"
              name="subcategoryTitle"
              value={subcategoryTitle}
            />
          </div>
        </div>
        <div className="row justify-content-center mt-4 btnmargin">
          <div className="col-1 justify-conteny-center">
            <button
              type="button"
              class="btn btn-success"
              onClick={() => handleSubCatSubmit()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default EdittSubCat;

import React, { useEffect, useState } from "react";
import { utilsdays } from "../Pages/Categories";
import { CATEGORY_URL } from "../utils/apiConstant";
import { put } from "../utils/apiMethods";
import CommonModal from "./Commonmodal";

export default function EditCategory({ show, onHide, data, langId, onUpdate }) {
  const [categoryName, setCategoryName] = useState();
  const [categoryTitle, setCategoryTitle] = useState();
  const [godDays, setGodDays] = useState(utilsdays);
  const [catImage, setcatImage] = useState("");

  const userhandler = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      setCategoryName(value);
    } else if (name === "categoryTitle") {
      setCategoryTitle(value);
    }
  };

  useEffect(() => {
    setCategoryName(data.categoryName);
    setCategoryTitle(data.categoryTitle);
    if (data && data.day) {
      const array = [...godDays];
      const selectedDays = JSON.parse(data.day);
      selectedDays &&
        selectedDays.length &&
        selectedDays.forEach((item) => {
          array.forEach((day) => {
            if (item === day.value) {
              day.isSelected = true;
            }
          });
        });
      setGodDays(array);
    }
  }, [data]);

  // console.log("DATAAA", data);
  // days selection
  const onDaysSelect = (index) => {
    const array = [...godDays];
    array[index].isSelected = !array[index].isSelected;
    setGodDays(array);
  };
  const onSubmitt = async () => {
    const selectedDays = godDays.filter((data) => data.isSelected);
    let days = [];
    selectedDays &&
      selectedDays.length &&
      selectedDays.forEach((item) => days.push(item.value));
    if (categoryName === "") {
      alert("Please enter category name");
    } else if (categoryTitle === "") {
      alert("Please enter category title");
    } else {
      const reqObj = {
        categoryName,
        categoryTitle,
        // lang_id: langId,
        day: JSON.stringify(days),
        imageUrl: catImage,
      };
      const URL = `${CATEGORY_URL}/${data._id}`;
      const response = await put(URL, reqObj);
      // console.log("resp", response);
      if (
        response &&
        response.message.toLowerCase().includes("updated successfully")
      ) {
        onUpdate();
      } else {
        alert("Some thing went wrong please check api response in network");
      }
      setGodDays(utilsdays);
      onHide();
    }
  };

  const onUploadImage = async (e) => {
    console.log("file", e.target.files[0]);
    const response = await getBase64(e.target.files[0]);
    setcatImage(response);
    var output = document.getElementById("image-change");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  return (
    <CommonModal show={show} title="Edit Category" onHide={onHide}>
      <div className="container ">
        <div className="row  d-flex justify-conteny">
          <div className="col">
            <label className="color " for="formGroupExampleInput">
              category Name/ Gods name
            </label>
            <input
              onChange={userhandler}
              class="form-control m-2"
              type="text"
              placeholder="category Name/ Gods name"
              name="categoryName"
              value={categoryName}
            />
          </div>
        </div>
        <div className="row  d-flexjustify-content-center">
          <div className="col ">
            <label className="color " for="formGroupExampleInput">
              categoryTitle / Regional title
            </label>
            <input
              onChange={userhandler}
              class="form-control m-2"
              type="text"
              placeholder="categoryTitle / Regional title"
              name="categoryTitle"
              value={categoryTitle}
            />
          </div>

          <div className="row  d-flexjustify-content-center">
            <div className="col ">
              <label className="color " for="formGroupExampleInput">
                Gods days
              </label>

              <div className="row">
                {godDays &&
                  godDays.map((day, i) => {
                    return (
                      <div onClick={() => onDaysSelect(i)} className="col-4">
                        <input
                          type="checkbox"
                          checked={day.isSelected}
                          className="checkbox_margin"
                        ></input>
                        <label className="days-label">{day.label}</label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="row  d-flexjustify-content-center">
            <div className="col ">
              <label className="color " for="formGroupExampleInput">
                CategoryImage
              </label>
              <input
                onChange={onUploadImage}
                class="form-control m-2"
                type="file"
                placeholder="CategoryImage"
                name="categoryImage"
              />
            </div>
          </div>
        </div>
        <img
          src={data.imageUrl}
          id="image-change"
          height="150px"
          width="150px"
        />
        <div className="row justify-content-center mt-4 btnmargin">
          <div className="col-1 justify-conteny-center">
            <button
              type="button"
              class="btn btn-success"
              onClick={() => onSubmitt()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </CommonModal>
  );
}

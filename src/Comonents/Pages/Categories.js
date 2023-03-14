import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import "./Categories.css";
import { Button } from "react-bootstrap";
import CardComponent from "../CommonComponents/CardComponent";
import CommonModal from "../Modal/Commonmodal";
import Select from "react-select";
import { get, post, put } from "../utils/apiMethods";
import {
  BASE_URL,
  CATEGORY_URL,
  LANGUAGE_ADD_URL,
  SUB_CATEGORY_URL,
} from "../utils/apiConstant";
import StrotraInsert from "../Modal/StrotraInsert";
import { json } from "react-router-dom";
import EditCategory from "../Modal/EditCategory";
import EdittSubCat from "../Modal/EdittSubCat";
import DeleteModal from "../Modal/DeleteModal";

export const utilsdays = [
  { label: "Monday", value: "Monday", isSelected: false },
  { label: "Tuesday", value: "Tuesday", isSelected: false },
  { label: "Wednesday", value: "Wednesday", isSelected: false },
  { label: "Thursday", value: "Thursday", isSelected: false },
  { label: "Friday", value: "Friday", isSelected: false },
  { label: "Saturday", value: "Saturday", isSelected: false },
  { label: "Sunday", value: "Sunday", isSelected: false },
];

export default function Categories() {
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState({
    data: {},
    isOpen: false,
  });

  const [categoryName, setCategoryName] = useState();
  const [categoryTitle, setCategoryTitle] = useState();
  const [day, setDay] = useState();
  const [category, setCategory] = useState([]);
  const [isLang, setIsLang] = useState(false);
  const [langData, setLangData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [isEditSubCategory, setIsEditSubCategory] = useState({
    data: "",
    isOpen: false,
  });
  const [subcategoryName, setSubCategoryName] = useState();
  const [subcategoryTitle, setsubcategoryTitle] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [isDetailsModal, setIsDetailsModal] = useState({
    type: "add",
    data: "",
    isOpen: false,
  });
  const [detailsData, setDetailsData] = useState([]);
  const [godDays, setGodDays] = useState(utilsdays);
  const [deleteData, setDeleteData] = useState({});
  const [deleteModal, setDeleteModal] = useState({ title: "", isOpen: false });
  const [catImage, setcatImage] = useState("");

  useEffect(() => {
    // callCategoryApi();
    callGetApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("selectedLanguage", selectedLanguage);
  useEffect(() => {
    if (selectedLanguage && selectedLanguage.label) {
      callCategoryApi();
    }
  }, [selectedLanguage]);

  const callGetApi = async () => {
    const getLanguage = await get(LANGUAGE_ADD_URL);
    if (
      getLanguage.message.includes("data fetched") &&
      getLanguage.data &&
      getLanguage.data.length
    ) {
      setIsLang(false);
      const dropdownData = [];
      getLanguage.data.map((item) => {
        const obj = {
          label: item.displayLang,
          value: item._id,
        };
        dropdownData.push(obj);
      });
      setLangData(dropdownData);
    }
  };

  const callCategoryApi = async () => {
    const { value: langId } = selectedLanguage;
    const result = await get(`${CATEGORY_URL}/${langId}`);
    if (result?.data.length) {
      setCategory(result.data);
    } else {
      setCategory([]);
    }
  };

  const userhandler = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      setCategoryName(value);
    } else if (name === "categoryTitle") {
      setCategoryTitle(value);
    } else if (name === "days") {
      setDay(value);
    } else if (name === "subcategoryName") {
      setSubCategoryName(value);
    } else if (name === "subcategoryTitle") {
      setsubcategoryTitle(value);
    }
  };

  const handleSelect = async (e) => {
    setSelectedLanguage(e);
    setIsLang(false);
  };

  const cardClickSubCategory = (data) => {
    const subCategoryData = [];
    // eslint-disable-next-line array-callback-return
    subCategory.map((item) => {
      if (item._id === data._id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
      subCategoryData.push(item);
    });
    selectedCategory.sub_category = subCategoryData;
    const selectedSubCategoryData = subCategoryData.filter(
      (item) => item.isSelected === true
    );
    if (selectedSubCategoryData.length) {
      setSelectedSubCategory(selectedSubCategoryData[0]);
      const dummy = selectedSubCategoryData[0].details;
      setDetailsData(dummy ? JSON.parse(dummy) : []);
      setSelectedCategory(selectedCategory);
      setSubCategory(subCategoryData);
    } else {
      setDetailsData([]);
    }
  };

  const cardClickCategory = (data) => {
    const categoryData = [];
    // eslint-disable-next-line array-callback-return
    category.map((item) => {
      if (item._id === data._id) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
      categoryData.push(item);
    });
    const selectedCategoryFilter = categoryData.filter(
      (item) => item.isSelected === true
    );
    if (selectedCategoryFilter.length) {
      setSubCategory(selectedCategoryFilter[0].sub_category);
      setSelectedCategory(selectedCategoryFilter[0]);
    }
    setCategory(categoryData);
  };

  const handleSubCatSubmit = async () => {
    if (subcategoryName === "") {
      alert("please add subCategory / mantra name");
    } else if (subcategoryTitle === "") {
      alert("please add subCategory title / regional mantra name");
    } else {
      const reqObj = {
        sub_category_name: subcategoryName,
        sub_category_title: subcategoryTitle,
      };
      // console.log("selectedCategory", selectedCategory);
      const url = SUB_CATEGORY_URL.replace(
        "<SUB_CATEGORY_ID>",
        selectedCategory._id
      );
      const response = await post(url, reqObj);
      // console.log("response", response);
      if (
        response &&
        response.message.toLowerCase().includes("created successfully")
      ) {
        callCategoryApi();
        setIsSubCategory(false);
      } else {
        alert("Some thing went wrong please check api response in network");
      }
    }
  };

  const handleSubmit = async () => {
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
        lang_id: selectedLanguage.value,
        day: JSON.stringify(days),
        imageUrl: catImage,
      };
      const response = await post(CATEGORY_URL, reqObj);
      // console.log("resp", response);
      if (
        response &&
        response.message.toLowerCase().includes("created successfully")
      ) {
        callCategoryApi();
        setIsAddCategory(false);
      } else {
        alert("Some thing went wrong please check api response in network");
      }
      setGodDays(utilsdays);
    }
  };
  // details API

  const onDetailsAdd = async (data) => {
    const URL = `${BASE_URL}/category/${selectedCategory._id}/subCategory/details`;
    const string = JSON.stringify(data);
    const reqObj = {
      id: selectedSubCategory._id,
      details: `${string.replace(/\\n/g, " ")}`,
    };

    const response = await put(URL, reqObj);
    if (
      response &&
      response.message.toLowerCase().includes("updated successfully")
    ) {
      // console.log("response", response);
      await callCategoryApi();
    }
    setIsDetailsModal({ isOpen: false, data: {}, type: "" });
  };

  // days selection
  const onDaysSelect = (index) => {
    const array = [...godDays];
    array[index].isSelected = !array[index].isSelected;
    setGodDays(array);
  };
  // category edit
  const onEditCategory = (data) => {
    setIsEditCategory({ data: data, isOpen: true });
  };

  const onEditSubCategory = (data) => {
    setIsEditSubCategory({ data: data, isOpen: true });
  };

  // delete

  const onClickDelete = (type, data) => {
    if (type === "cat") {
      setDeleteData(data);
      setDeleteModal({ title: "Category", isOpen: true });
    } else if (type === "subCat") {
      setDeleteData(data);
      setDeleteModal({ title: "Sub-Category", isOpen: true });
    } else if (type === "details") {
      setDeleteData({
        categoryId: selectedCategory._id,
        subCatId: selectedSubCategory._id,
      });
      setDeleteModal({ title: "Strotra", isOpen: true });
    }
  };

  const onDeleteModalClose = () => {
    setDeleteData({});
    setDeleteModal({ title: "", isOpen: false });
  };

  const onDataUpdate = async (response) => {
    setSelectedCategory({});
    setSubCategory({});
    await callCategoryApi();
  };

  const onUploadImage = async (e) => {
    // console.log("file", e.target.files[0]);
    const response = await getBase64(e.target.files[0]);
    setcatImage(response);
    var output = document.getElementById("image");
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
  const onCatModalClose = () => {
    setcatImage("");
    setIsAddCategory(false);
    setGodDays(utilsdays);
  };
  return (
    <>
      <Layout>
        {/* details modal */}
        {isDetailsModal.isOpen && (
          <StrotraInsert
            show={isDetailsModal.isOpen}
            onHide={() =>
              setIsDetailsModal({ isOpen: false, data: {}, type: "" })
            }
            onSubmit={onDetailsAdd}
            type={isDetailsModal.type}
            data={isDetailsModal.data}
          />
        )}

        {/*  */}

        {/* edit category */}
        {isEditCategory.isOpen && (
          <EditCategory
            show={isEditCategory.isOpen}
            onHide={() => setIsEditCategory({ isOpen: false })}
            data={isEditCategory.data}
            langId={selectedLanguage.value}
            onUpdate={onDataUpdate}
          />
        )}

        {/* end */}

        {/* edit subcategory */}
        {isEditSubCategory.isOpen && (
          <EdittSubCat
            show={isEditSubCategory.isOpen}
            onHide={() => setIsEditSubCategory({ isOpen: false })}
            data={isEditSubCategory.data}
            langId={selectedLanguage.value}
            categoryId={selectedCategory._id}
            onUpdate={onDataUpdate}
          />
        )}

        {/* end */}

        {/* Delete modal */}
        {deleteModal.isOpen && (
          <DeleteModal
            show={deleteModal.isOpen}
            title={deleteModal.title}
            onHide={() => onDeleteModalClose()}
            data={deleteData}
            onDone={onDataUpdate}
            categoryId={selectedCategory._id}
          />
        )}

        {/* end */}
        <p style={{ fontSize: "1.2rem" }}>
          Selected Language :
          <span style={{ fontWeight: "600" }}>{selectedLanguage.label}</span>
        </p>
        <div>
          <Button onClick={() => setIsLang(true)}>Change Language</Button>
        </div>
        <CommonModal
          show={isSubCategory}
          title="Add Sub Category"
          onHide={() => setIsSubCategory(false)}
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
                  Submit
                </button>
              </div>
            </div>
          </div>
        </CommonModal>

        {/* language modal */}
        <CommonModal
          show={isLang}
          title="Select Language"
          onHide={() => setIsLang(false)}
        >
          <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            name="color"
            options={langData}
            defaultValue={selectedLanguage}
            onChange={(e) => {
              handleSelect(e);
            }}
          />
          <div className="mt-4">
            <Button onClick={() => setIsLang(false)}>Close</Button>
          </div>
        </CommonModal>
        {/* end */}

        {/* category modal */}
        <CommonModal
          show={isAddCategory}
          title=" Add Category"
          onHide={() => onCatModalClose(false)}
        >
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
                          <div
                            onClick={() => onDaysSelect(i)}
                            className="col-4"
                          >
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
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <img id="image" height="150px" width="150px" />
                </div>
              </div>
            </div>
            <div className="row justify-content-center mt-4 btnmargin">
              <div className="col-1 justify-conteny-center">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </CommonModal>
        {/* end */}
        <div className="flexContainer">
          <div className="flexItem">
            {Object.keys(selectedLanguage).length ? (
              <Button onClick={() => setIsAddCategory(true)}>
                Add Category
              </Button>
            ) : null}

            <div className="innerFlexItem">
              {category && category.length ? (
                category.map((item) => {
                  return (
                    <>
                      <CardComponent
                        isCategory
                        isSelected={item.isSelected}
                        item={item}
                        buttonClick={cardClickCategory}
                        content={item.categoryTitle}
                        image={item.imageUrl}
                        details={item}
                        onEdit={onEditCategory}
                        onDelete={(data) => onClickDelete("cat", data)}
                      />
                    </>
                  );
                })
              ) : (
                <div> No Category found </div>
              )}
            </div>
          </div>

          <div className="flexItem">
            {Object.keys(selectedCategory).length ? (
              <Button onClick={() => setIsSubCategory(true)}>
                Add Sub Category / Mantra
              </Button>
            ) : null}
            <div className="innerFlexItem">
              {subCategory && subCategory.length ? (
                subCategory.map((item) => {
                  return (
                    <>
                      <CardComponent
                        isSelected={item.isSelected}
                        item={item}
                        buttonClick={cardClickSubCategory}
                        content={item.sub_category_name}
                        onEdit={onEditSubCategory}
                        onDelete={(data) => onClickDelete("subCat", data)}
                        // image="https://i.pinimg.com/originals/ca/18/d2/ca18d2475812b56fb79394d06a4f00c4.jpg"
                      />
                    </>
                  );
                })
              ) : (
                <div> No Sub category found </div>
              )}
            </div>
          </div>
          <div className="flexItem">
            {selectedSubCategory && Object.keys(selectedSubCategory).length ? (
              <>
                <Button
                  onClick={() =>
                    setIsDetailsModal({ isOpen: true, data: {}, type: "add" })
                  }
                >
                  Add details
                </Button>

                {detailsData && detailsData.length ? (
                  <>
                    <button
                      onClick={() =>
                        setIsDetailsModal({
                          isOpen: true,
                          data: detailsData,
                          type: "edit",
                        })
                      }
                      data-bs-toggle="tooltip"
                      title="Edit"
                      className="round-btn primary-col"
                    >
                      <i class="bi bi-pencil-fill"></i>
                    </button>

                    <button
                      onClick={() => onClickDelete("details", {})}
                      data-bs-toggle="tooltip"
                      title="Delete"
                      className="round-btn primary-col"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </>
                ) : null}
              </>
            ) : null}
            <div className="innerFlexItem">
              {detailsData &&
                detailsData.map((item) => {
                  return <p>{item}</p>;
                })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

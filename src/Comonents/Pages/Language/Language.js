import React, { useEffect } from "react";
import "./Language.css";
import Layout from "../../Layout";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  EnhancedTableHead,
  getComparator,
  stableSort,
} from "../../Tablecomponent";
import CommonModal from "../../Modal/Commonmodal";
import { get, post, put } from "../../utils/apiMethods";
import { BASE_URL, LANGUAGE_ADD_URL } from "../../utils/apiConstant";

export default function Language() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderby] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setpage] = useState(0);
  const [formmodal, setformmodal] = useState(false);
  const [languageCode, setlanguageCode] = useState("");
  const [languageName, setlanguageName] = useState("");
  const [type, setType] = useState("add");
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    callGetApi();
  }, []);

  const callGetApi = async () => {
    const getLanguage = await get(LANGUAGE_ADD_URL);
    if (
      getLanguage.message.includes("data fetched") &&
      getLanguage.data &&
      getLanguage.data.length
    ) {
      setData(getLanguage.data);
    }
  };

  function userhandler(e) {
    const { name, value } = e.target;
    if (name === "langname") {
      setlanguageName(value);
    } else if (name === "langcode") {
      setlanguageCode(value);
    }
  }

  const handleSubmit = async () => {
    if (languageName === "") {
      alert("please add language name");
    } else if (languageCode === "") {
      alert("please add language code");
    } else {
      const reqObj = {
        langCode: languageCode,
        displayLang: languageName,
      };
      const response = await post(LANGUAGE_ADD_URL, reqObj);
      if (
        response.message &&
        response.message.includes("created successfully")
      ) {
        alert(response.message);
        const getLanguage = await get(LANGUAGE_ADD_URL);
        if (
          getLanguage.message.includes("data fetched") &&
          getLanguage.data &&
          getLanguage.data.length
        ) {
          setData(getLanguage.data);
          setformmodal(false);
        }
      } else {
        alert("failed to insert");
      }
    }
  };

  const onStatusUpdate = async (status, data) => {
    const url = `${BASE_URL}/language/${data._id}`;
    const reqObj = {
      languageCode: data.langCode,
      displayLanguage: data.displayLang,
      isActive: status,
    };
    const response = await put(url, reqObj);
    if (response && response.message.toLowerCase().includes("success")) {
      callGetApi();
    }
  };
  const onUpdate = async () => {
    if (languageName === "") {
      alert("please add language name");
    } else if (languageCode === "") {
      alert("please add language code");
    } else {
      const reqObj = {
        languageCode: languageCode,
        displayLanguage: languageName,
      };
      const url = `${BASE_URL}/language/${selectedLang}`;
      const response = await put(url, reqObj);
      if (response.message && response.message.includes("success")) {
        alert(response.message);
        const getLanguage = await get(LANGUAGE_ADD_URL);
        if (
          getLanguage.message.includes("data fetched") &&
          getLanguage.data &&
          getLanguage.data.length
        ) {
          setData(getLanguage.data);
          setformmodal(false);
        }
      } else {
        alert("failed to insert");
      }
    }
  };
  const onEditClick = (data) => {
    setType("edit");
    setlanguageCode(data.langCode);
    setlanguageName(data.displayLang);
    setformmodal(true);
    setSelectedLang(data._id);
  };

  const onModalOpen = () => {
    setlanguageCode("");
    setlanguageName("");
    setformmodal(true);
  };
  return (
    <>
      <Layout>
        <button
          type="button"
          class="btn btn-primary mt-4 mb-4"
          onClick={() => {
            onModalOpen();
          }}
        >
          Add Language
        </button>

        <CommonModal
          show={formmodal}
          title=" Add language"
          onHide={() => setformmodal(false)}
        >
          {/* <button onClick={()=>setformmodal(false)}>X</button> */}

          <div className="container ">
            <div className="row  d-flex justify-conteny">
              <div className="col">
                <label className="color " for="formGroupExampleInput">
                  Language Code
                </label>
                <input
                  onChange={userhandler}
                  class="form-control m-2"
                  type="text"
                  placeholder="language code"
                  name="langcode"
                  value={languageCode}
                />
              </div>
            </div>
            <div className="row  d-flexjustify-content-center">
              <div className="col ">
                <label className="color " for="formGroupExampleInput">
                  Language name
                </label>
                <input
                  onChange={userhandler}
                  class="form-control m-2"
                  type="text"
                  placeholder="language code"
                  name="langname"
                  value={languageName}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-4 btnmargin">
              <div className="col-1 justify-conteny-center">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => (type === "add" ? handleSubmit() : onUpdate())}
                >
                  {type === "add" ? "Submit" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </CommonModal>

        <TableContainer id="tableDiv">
          <Table
            sx={{ minWidth: 750, borderCollapse: "separate" }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              rowCount={data.length}
              headCells={headCells}
            />
            <TableBody className="table">
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const color = row.isActive ? "green" : "gray";
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align="center" scope="row" padding="none">
                        {row.displayLang}
                      </TableCell>
                      <TableCell align="center">{row.langCode}</TableCell>
                      <TableCell align="center">
                        <span style={{ color: color }}>
                          {row.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          <button
                            onClick={() => onEditClick(row)}
                            data-bs-toggle="tooltip"
                            title="Edit"
                            className="round-btn primary-col"
                          >
                            <i class="bi bi-pencil-fill"></i>
                          </button>

                          <button
                            onClick={() =>
                              onStatusUpdate(row.isActive ? false : true, row)
                            }
                            data-bs-toggle="tooltip"
                            title={row.isActive ? "Deactivate" : "Activate"}
                            className="round-btn primary-col"
                          >
                            <i
                              className={
                                row.isActive ? "bi bi-dash-lg" : "bi bi-magic"
                              }
                            ></i>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="d-flex justify-content-end">
          {/* <NewsEditForm showAddPopup={showAddPopup} hidePopup={hidePopup}/> */}

          {/* <Button customClass="mt-4 border border-dark rounded-pill" title="News Type" onClick={() => hidePopup()} /> */}
        </div>
      </Layout>
    </>
  );
}

const headCells = [
  {
    id: "displayLang",
    numeric: false,
    disablePadding: false,
    label: "name",
  },
  {
    id: "langCode",
    numeric: false,
    disablePadding: false,
    label: "code",
  },
  {
    id: "isActive",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

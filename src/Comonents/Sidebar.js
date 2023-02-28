import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
export default function Sidebar() {
  let Navigate = useNavigate();

  return (
    <div
      style={{ overflow: "auto", height: "100%" }}
      className="  w-150 position-absolute col-2 bg-color "
    >
      <div className="row color-dark m-3 ">
        <h3>Mantra App</h3>
      </div>
      <NavLink
        to="/language"
        className="list row p-4 d-flex align-items-center"
        onClick={() => Navigate("/Language")}
      >
        <span>Language</span>
      </NavLink>
      <NavLink
        to="/Categories"
        activeClassName="active"
        className={`list row p-4 d-flex align-items-center`}
        onClick={() => Navigate("/Categories")}
      >
        <span>Categories</span>
      </NavLink>

      {/* <div className='list row p-4 d-flex align-items-center' ><span>God</span></div> */}
    </div>
  );
}

//
/* <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark col-2" >
<a  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
  <span className="fs-4">Sidebar</span>
</a>
<ul className="nav nav-pills flex-column mb-auto">
  <li className="nav-item">
    <a  className="nav-link active" aria-current="page">
      Home
    </a>
  </li>
  <li>
    <a  className="nav-link text-white">
      Dashboard
    </a>
  </li>
  <li>
    <a className="nav-link text-white">
      Orders
    </a>
  </li>
  <li>
    <a className="nav-link text-white">
      Products
    </a>
  </li>
  <li>
    <a  className="nav-link text-white">
      Customers
    </a>
  </li>
</ul>
<hr/>
<div className="dropdown">
  <a  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
    <strong>mdo</strong>
  </a>
  <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
    <li><a className="dropdown-item" href="#">New project...</a></li>
    <li><a className="dropdown-item" href="#">Settings</a></li>
    <li><a className="dropdown-item" href="#">Profile</a></li>
    <li><a className="dropdown-item" href="#">Sign out</a></li>
  </ul>
</div>
</div>
  )
} */

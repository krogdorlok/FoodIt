import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false); //here we are making a state
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken"); //removing the existing user and moving to the home page
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        {/*mx is left se margin kitna, and me is right se kitna, mt is top , mb is bottom*/}
        <Link className="navbar-brand mx-3" to="/">
          <h1>Food</h1>
          <h1 className="text-muted">It</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <span className="font1"></span>
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active mt-3" to="/">
                <h3>
                  <small className="text-white">HOME</small>
                </h3>
              </Link>
            </li>
            {localStorage.getItem("authtoken") ? (
              <li className="nav-item active">
                <Link className="nav-link active mt-3" to="/">
                  <h3>
                    <small className="text-white">My Orders</small>
                  </h3>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authtoken") ? (
            <div className="d-flex">
              <Link className="btn bg white text-green mx-1 fs-3" to="/Login">
                <h3>
                  <small className="text-danger">LOGIN</small>
                </h3>
              </Link>

              <Link
                className="btn bg white text-green mx-1 fs-3"
                to="/createuser"
              >
                <h3>
                  <small className="text-white">SIGN UP</small>
                </h3>
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg white text-green mx-1 fs-3"
                onClick={() => {
                  setCartView(true);
                }}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {data.length}
                </Badge>
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              ) : null}{" "}
              {/*if cartView is true then display Modal exported, else(:) display null*/}
              <div
                className="btn bg white text-green mx-1 fs-3"
                onClick={handleLogout}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

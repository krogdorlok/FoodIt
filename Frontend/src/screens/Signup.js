import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//this whole page is for the signup part, where the user fills in data, now this data will reach an
//endpoint for the frontend , that endpoint is handlesubmit, which will later be connected to the backend
export default function Signup() {
  const [information, setinformation] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        name: information.name,
        email: information.email,
        password: information.password,
        location: information.geolocation,
      })
    );
    // const response = await fetch("http://localhost:8000/api/createuser",{//POST fetch api is an inbuilt function
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: information.name,
          email: information.email,
          password: information.password,
          location: information.geolocation,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (!json.success) alert("enter valid creds");

    if (json.success) navigate("/login");
  };

  const onChange = (event) => {
    setinformation({ ...information, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={information.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={information.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          {/*onChange allows us to make changes in the name, email, pw sections, else
    they shall always remain static, meaning, they wont allow any change in them*/}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={information.password}
              onChange={onChange}
              id="exampleInputPassword1"
              aria-describedby="passwordHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLocation1" className="form-label">
              Location
            </label>
            <input
              type="geolocation"
              className="form-control"
              name="geolocation"
              value={information.geolocation}
              onChange={onChange}
              id="exampleInput1"
              aria-describedby="passwHelp"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
}

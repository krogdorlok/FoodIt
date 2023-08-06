import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  // we are doing this so that we dont have to call Cards, many times in index.js.
  //and just one call to card, reads al data and populates the field appropriately.
  const [foodCat, setfoodCat] = useState([]); //array supports map, objects doesnt support map, dont use {}
  const [foodItem, setfoodItem] = useState([]);
  const [search, setSearch] = useState(""); //not object but empty string

  console.log(process.env.REACT_APP_BACKEND_URL);

  const loadData = async () => {
    // let response = await fetch("http://localhost:8000/api/foodData", {
    let response = fetch(
      `https://foodit-backend.onrender.com/api/auth/orderData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);

    //console.log(response[0],response[1]);  //this shall cause all db data to come under the
    //array inside the console, of the homepage
  }; //which tells us that the db has reached the frontend
  //it just has to be on the carousel, and be displayed neatly.
  //for that we ll use destructuring.
  useEffect(() => {
    loadData();
  }, []); //the empty [] here means during the first call there is no dependency and everything shall be called

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                {" "}
                {/* justify-content-center, copy this <form> from navbar for search box */}
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn text-white bg-danger"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {
          //initially the filter run under the category name section, when matches with that of the items, cateegory name
          //it gets selected, and after filtration an array is created.
          //after this a map is created, which later calls "Card".
          //now a card gets created for as many times as much data is present in the map

          foodCat &&
            foodCat.map((data) => {
              //? means 'then' for the !==
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodName={filterItems.name}
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                              imgSrc={filterItems.img}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div> No data found</div>
                  )}
                </div>
              );
            })
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

module.export = Router;

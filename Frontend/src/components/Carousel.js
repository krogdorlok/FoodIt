import React from 'react'
import { Link } from 'react-router-dom'
import { setSearch} from './H'
export default function Carousel() {
    return (
        <div>
            {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style={{objectFit:"contain"}}>
                <div className="carousel-caption" style={{ zIndex: "10" }}>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2 w-100" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0 h-100 m-2" type="submit">Search</button>
                    </form>
                </div>
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner" id='carousel'>
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="https://source.unsplash.com/random/700x500/?burger" alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://source.unsplash.com/random/700x500/?burger" alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://source.unsplash.com/random/700x500/?burger" alt="Third slide" />
                    </div>
                </div>
                <Link class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                    <script src="js/jquery-1.7.1.min.js"></script>
<script src="js/bootstrap.js"></script>
                </Link>
                <Link class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                    <script src="js/jquery-1.7.1.min.js"></script>
<script src="js/bootstrap.js"></script>
                </Link>
            </div> */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                <div className="carousel-inner " id='carousel'>
                    <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                        <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

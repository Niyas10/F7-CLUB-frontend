import React from 'react'
import './Landingpage.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Landingpage() {


  return (
   <>
<div className="banner-img">
  <div
    id="carouselExampleIndicators"
    className="carousel slide"
    data-bs-ride="carousel"
    data-bs-pause="false"
    data-bs-interval="3000"
  >
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src="/public/images/banner edit.png"
          className="d-block w-100 carousel-zoom"
          alt="..."
        />
        <div className="carousel-caption  text-center" style={{display:'flex',justifyContent:'center'}}>
        <a href='#third'> <div  className="mouse"> </div> </a>
        </div>
      </div>
    </div>
  </div>
</div>



   
   </>
  )
}

export default Landingpage
import React from "react";

import "./FourthSection.css";

function FourthSection() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* First Column (Carousel) */}
        <div className="col-lg-6">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/loginimg (1).jpg" className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt="Carousel Image 1" />
              </div>
              <div className="carousel-item">
                <img src="/images/logotwo.jpg" className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt="Carousel Image 2" />
              </div>
              <div className="carousel-item">
                <img src="/images/logosignup.jpg" className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt="Carousel Image 3" />
              </div>
            </div>
          </div>
        </div>

        {/* Second Column (Text) */}
        <div className="col-lg-6">
          <div className="d-flex flex-column justify-content-center h-100">
            <h1>Our Misson</h1>
           
            <p>
            Our purpose is to pass on empowering knowledge and training guidance in order to have a positive impact on the health and fitness of everyone we work with.

To provide a personalised health and fitness service that unlocks every individual’s true potential so they can achieve their desired goals
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default FourthSection;

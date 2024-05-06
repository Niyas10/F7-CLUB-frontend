import React from "react";
import "./SecondSection.css";

function SecondSection() {
  return (
    <>
  
            <div className="second-section container-fluid">
                <div style={{ textAlign: "center" }}>
                    <h5>CLASSES DESIGNED</h5>
                </div>
                <div style={{ textAlign: "center",paddingBottom:'50px' }}>
                    <h1>FOR YOU</h1>
                </div>
                <div className="category-section">
                    <div className="row">
                    <div className="col-lg-3 col-md-6 mb-4">
                            <div className="image-container">
                                <img src="/public/images/1.webp" alt="" className="img-fluid" />
                               
                            </div>
                             <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
                                    <h4>Outdoor  <br /> Classes</h4>
                                    <img src="/logo/green arrow.svg" alt="" style={{ height: "20px", transform: "rotate(44deg)", marginTop: '6px' }} />
                                </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="image-container">
                                <img src="/public/images/2.webp" alt="" className="img-fluid" />
                               
                            </div>
                             <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
                                    <h4>Outdoor  <br /> Classes</h4>
                                    <img src="/logo/green arrow.svg" alt="" style={{ height: "20px", transform: "rotate(44deg)", marginTop: '6px' }} />
                                </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="image-container">
                                <img src="/public/images/3.webp" alt="" className="img-fluid" />
                               
                            </div>
                             <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
                                    <h4>Outdoor  <br /> Classes</h4>
                                    <img src="/logo/green arrow.svg" alt="" style={{ height: "20px", transform: "rotate(44deg)", marginTop: '6px' }} />
                                </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="image-container">
                                <img src="/public/images/4.webp" alt="" className="img-fluid" />
                               
                            </div>
                             <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
                                    <h4 >Outdoor  <br /> Classes</h4>
                                    <img src="/logo/green arrow.svg" alt="" style={{ height: "20px", transform: "rotate(44deg)", marginTop: '6px' }} />
                                </div>
                        </div>
                    </div>
                </div>
            </div>

       

      
    </>
  );
}

export default SecondSection;

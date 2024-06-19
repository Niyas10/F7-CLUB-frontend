import React from "react";
import "./UserSideWorkout.css";

function UserSideWorkout() {
  return (
    <>
      <div>
        <div
          style={{
            paddingTop: "25px",
            paddingBottom: "25px",
            backgroundColor: "black",
          }}
        >
          <div className="classic-section">
            <h6 style={{ marginBottom: "0px", marginRight: "20px" }}>
              {" "}
              <a className="workout-font" href="">
                {" "}
                CLASSIC{" "}
              </a>{" "}
            </h6>

            <h6 style={{ marginBottom: "0px", marginLeft: "20px" }}>
              {" "}
              <a className="workout-font" href="">
                PREMIUM
              </a>{" "}
            </h6>
          </div>
        </div>

        <div className="category-section container-fluid" style={{marginTop:'5px'}}>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="image-container">
                <img src="/public/images/1.webp" alt="" className="img-fluid" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
               
                }}
              >
                <h4>
                  Outdoor <br /> Classes
                </h4>
                <img
                  src="/logo/green arrow.svg"
                  alt=""
                  style={{
                    height: "20px",
                    transform: "rotate(44deg)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="image-container">
                <img src="/public/images/2.webp" alt="" className="img-fluid" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <h4>
                  Outdoor <br /> Classes
                </h4>
                <img
                  src="/logo/green arrow.svg"
                  alt=""
                  style={{
                    height: "20px",
                    transform: "rotate(44deg)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="image-container">
                <img src="/public/images/3.webp" alt="" className="img-fluid" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <h4>
                  Outdoor <br /> Classes
                </h4>
                <img
                  src="/logo/green arrow.svg"
                  alt=""
                  style={{
                    height: "20px",
                    transform: "rotate(44deg)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="image-container">
                <img src="/public/images/4.webp" alt="" className="img-fluid" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <h4>
                  Outdoor <br /> Classes
                </h4>
                <img
                  src="/logo/green arrow.svg"
                  alt=""
                  style={{
                    height: "20px",
                    transform: "rotate(44deg)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="image-container">
                <img src="/public/images/1.webp" alt="" className="img-fluid" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <h4>
                  Outdoor <br /> Classes
                </h4>
                <img
                  src="/logo/green arrow.svg"
                  alt=""
                  style={{
                    height: "20px",
                    transform: "rotate(44deg)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="image-container">
                <img src="/public/images/2.webp" alt="" className="img-fluid" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <h4>
                  Outdoor <br /> Classes
                </h4>
                <img
                  src="/logo/green arrow.svg"
                  alt=""
                  style={{
                    height: "20px",
                    transform: "rotate(44deg)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="image-container">
                <img src="/public/images/3.webp" alt="" className="img-fluid" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <h4>
                  Outdoor <br /> Classes
                </h4>
                <img
                  src="/logo/green arrow.svg"
                  alt=""
                  style={{
                    height: "20px",
                    transform: "rotate(44deg)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="image-container">
                <img src="/public/images/4.webp" alt="" className="img-fluid" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <h4>
                  Outdoor <br /> Classes
                </h4>
                <img
                  src="/logo/green arrow.svg"
                  alt=""
                  style={{
                    height: "20px",
                    transform: "rotate(44deg)",
                    marginTop: "6px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSideWorkout;

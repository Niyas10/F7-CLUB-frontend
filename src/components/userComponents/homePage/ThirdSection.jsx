import React from "react";
import "./ThirdSection.css";

function ThirdSection() {
  return (
    <>
<div   id="third"  className="third-section">
    <div className="row container-fluid">
        <div className="col-lg-12 text-start">
            <div className="row">
                <div className="col-lg-4 text-start">
                    <img
                        src="/public/logo/green arrow.svg"
                        alt=""
                        style={{
                            height: "300px",
                            transform: "rotate(44deg)",
                            marginTop: "6px",
                        }}
                    />
                </div>
                <div className="col-lg-8">
                    <div style={{marginTop:'90px'}}>
                        <h4 className="text-center">INTRODUCTION</h4>
                        <h1    className="text-center third-section-h1" style={{ fontSize: "90px",position:'relative',bottom:'30px' }}>F7 CLUB</h1>
                    </div>
                </div>
             
            </div>
        </div>
    </div>
</div>

    </>
  );
}

export default ThirdSection;

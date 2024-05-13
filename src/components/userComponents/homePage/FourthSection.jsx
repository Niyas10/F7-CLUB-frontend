import React,{useEffect} from "react";
import "./FourthSection.css";
import AOS from 'aos';
import 'aos/dist/aos.css';



function FourthSection() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="row " style={{ marginTop: "70px" }} data-aos="fade-up"
     data-aos-duration="1000" >
        <div className="col-lg-6" style={{paddingLeft:'25px'}}>
         <div style={{ marginTop: "30px" }} data-aos="fade-right" >
         <h1>   OUR  <span style={{color:'#d6fb00'}}> MISSON </span>  </h1>
          <p style={{textAlign:'justify'}}>
            Our purpose is to pass on empowering knowledge and training guidance
            in order to have a positive impact on the health and fitness of
            everyone we work with. To provide a personalised health and fitness
            service that unlocks every individual’s true potential so they can
            achieve their desired goals.
          </p>
          <button className="home_btn" data-aos="fade-right"   data-aos-duration="1000">
              Read more  <img style={{transform:'rotate(43deg)',widows:"15px",height:'15px'}} src="\logo\green arrow.svg" alt="" />
          </button>
         </div>

        </div>

        <div className="col-lg-6 fourth-sectin-div" data-aos="fade-left"   data-aos-duration="3000">
          <div>
            <img data-aos="zoom-in"
              style={{ width: "600px" }}
              className="fourth-section-backgound"
              src="\images\Screenshot_2024-05-12_145626-removebg.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FourthSection;

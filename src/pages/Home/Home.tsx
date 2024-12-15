import React from "react";
import icons from "../../assets/icons";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import AnimatedMenu from "../../components/AnimatedMenu/AnimatedMenu";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="homeHeader">
        <img src={icons.retainSymbol} alt="" />
        <span className="home-heading">
          <p>Retain</p>
        </span>
      </div>
      <div className="homeCard">
        <div className="homeCard-items">
          <div className="left-side-items"></div>
          <div className="right-side-items">
            <div><h5>Capital Countries</h5></div>
            <div><p>Today:3/11</p></div>
            <div className="pgBar-home">
              <ProgressBar progress={1} total={5} activecolor="rgba(81, 197, 70, 1)" deactivecolor="rgba(171, 250, 164, 1)" />
            </div>
          </div>
        </div>
      </div>
      <div className="homeFooter">
        <div className="homeFooter-button">
            <AnimatedMenu />
        </div>
      </div>
    </div>
  );
};

export default Home;

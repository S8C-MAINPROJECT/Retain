import React from "react";
import Symbol from "../../assets/retainSymbol.svg";
import Plus from "../../assets/plusSymbol.svg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="homeHeader">
        <img src={Symbol} alt="" />
        <span className="home-heading">
          <p>Retain</p>
        </span>
      </div>
      <div className="homeCard">
        <div className="homeCard-items">
          <div className="left-side-items"></div>
          <div className="right-side-items">
            <h5>Capital Countries</h5>
            <p>Today:3/11</p>
            <ProgressBar progress={1} total={5} />
          </div>
        </div>
      </div>
      <div className="homeFooter">
        <div className="homeFooter-button">
          <button>
            <img src={Plus} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

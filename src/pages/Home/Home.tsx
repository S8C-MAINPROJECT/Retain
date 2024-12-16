import { useState } from "react";
import icons from "../../assets/icons";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./Home.css";
import { Navigate,useNavigate } from "react-router-dom";

const Home = () => {
  const [show, setShow] = useState(false);
  const Navigate = useNavigate();
  return (
    <div className="home">
      <div className="homeHeader">
        <img src={icons.retainSymbol} alt="" />
        <span className="home-heading">
          <p>Retain</p>
        </span>
      </div>
      <div className="homeCard" onClick={() => {Navigate("/card")}}>
        <div className="homeCard-items">
          <div className="left-side-items"></div>
          <div className="right-side-items">
            <div>
              <h5>Capital Countries</h5>
            </div>
            <div>
              <p>Today:3/11</p>
            </div>
            <div className="pgBar-home">
              <ProgressBar
                progress={1}
                total={5}
                activecolor="rgba(81, 197, 70, 1)"
                deactivecolor="rgba(171, 250, 164, 1)"
              />
            </div>
          </div>
        </div>
      </div>

      {show ? <div className="uploadOptions">
        <div className="">
          <img className="uploadOptions-icon" id="left"
              src={icons.addText}
              alt=""
              onClick={() => {
                // setShow(true);
              }}
            />
          </div>
          <div>
          <img className="uploadOptions-icon" id="center"
              src={icons.addPDF}
              alt=""
              onClick={() => {
                // setShow(true);
              }}
            />
          </div>
          <div>
          <img className="uploadOptions-icon" id="right"
              src={icons.addDeck}
              alt=""
              onClick={() => {
                // setShow(true);
              }}
            />
          </div>
      </div> : null}
      
      <div className="homeFooter">
        <div className="homeFooter-button">
          <img
            src={show ? icons.boldcross : icons.plusSymbol}
            alt=""
            onClick={() => {
              setShow(!show);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

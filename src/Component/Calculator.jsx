import React, { useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "../CSS/Calculator.css";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

function CALCULATOR() {
  //States
  const [Principle, setPrinciple] = useState(0);
  const [Rate, setRate] = useState(1);
  const [Time, setTime] = useState(1);
  const [Emi, setEmi] = useState(0);
  const [Interest, setInterest] = useState(0);
  const [Total, setTotal] = useState(0);

  //Ref
  let PrincipleRangRef = useRef();
  let RateRangRef = useRef();
  let TimeRangRef = useRef();

  //Function

  const updatePrinciple = ({ target: { value } }) => {
    console.log(value);
    setPrinciple(value);
    PrincipleRangRef.current.value = value;
  };
  const updateRate = ({ target: { value } }) => {
    console.log(value);
    setRate(value);
    RateRangRef.current.value = value;
  };
  const updateTime = ({ target: { value } }) => {
    console.log(value);
    setTime(value);
    TimeRangRef.current.value = value;
  };

  // Emi Calculate
  const calculateEMI = () => {
    const r = Rate / (12 * 100);
    const n = Time * 12;

    // EMI formula
    const emiValue =
      (Principle * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    console.log(Emi);
    setEmi(emiValue.toFixed(2)); 

    let Interest=Math.floor((Principle*Rate*Time)/100)
    setInterest(Interest)
    let totalAmount =Number(Principle) + Number(Interest)
    setTotal(totalAmount)
  };

  // Chart
  const data = {
    labels: ["Principle", "Interest"],
    datasets: [
      {
        label: "My First Dataset",
        data: [Principle, Interest],
        backgroundColor: ["rgb(176, 42, 48)", "rgb(234, 118, 32)"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pie Chart Example",
      },
    },
  };

  return (
    <>
      <div className="container">
        <div className="Top">
          <TypeAnimation
            sequence={[
              "  HOME LOAN EMI CALCULATOR",
              2000,
              "Advanced EMI CALCULATOR",
              2000,
            ]}
            wrapper="span"
            speed={30}
            style={{
              fontSize: "14px",
              textTransform: "uppercase",
              display: "inline-block",
            }}
            repeat={Infinity}
          />

          <h2>Calculate Home Loan EMI</h2>
          <p>
            Use our Home Loan Calculator to get insights on your loan plan! Just
            select an amount, set an approximate interest rate and loan tenure.
            The Home Loan EMI Calculator will estimate the monthly EMI amount &
            total Interest payable till the end of the loan tenure.
          </p>
        </div>
        <div className="mid">
          <div className="left">
            <h4>Select the loan amount range</h4>
            <div className="radiobtn">
              <div>
                <input type="radio" id="" name="Lone" />
                <label htmlFor="">0 - 1 Crore</label>
              </div>
              <div>
                <input type="radio" id="" name="Lone" />
                <label htmlFor="">1 Crore - 5 Crore </label>
              </div>
              <div>
                <input type="radio" id="" name="Lone" />
                <label htmlFor="">5 Crore - 30 Crore</label>
              </div>
            </div>
            <div className="rangbtn">
              <div className="Principle">
                <p>Loan Amount</p>
                <input
                  type="text"
                  id="PrincipleAmount"
                  onChange={updatePrinciple}
                  value={Principle}
                />
                <input
                  type="range"
                  id="PrincipleAmountRange"
                  ref={PrincipleRangRef}
                  onChange={updatePrinciple}
                  min="50000000"
                  max="300000000"
                  value={Principle}
                />
                <div className="rateOfAmount">
                  {" "}
                  <span>0L</span> <span>20L</span> <span>40L</span>{" "}
                  <span>60L</span> <span>80L</span> <span>1Cr</span>{" "}
                </div>
              </div>
              <div className="Rate">
                <p>Illustrative Interest Rate p.a.</p>
                <input
                  type="text"
                  id="RateAmount"
                  ref={RateRangRef}
                  onChange={updateRate}
                  value={Rate}
                />
                <input
                  type="range"
                  onChange={updateRate}
                  min="1"
                  max="12"
                  value={Rate}
                />
                <div className="rateOfRange">
                  {" "}
                  <span>1%</span> <span>5%</span> <span>15%</span>{" "}
                  <span>20%</span>{" "}
                </div>
              </div>
              <div className="Time">
                <p>Tenure ( Months Years )</p>
                <input
                  type="text"
                  id="TimeAmount"
                  onChange={updateTime}
                  value={Time}
                />
                <input
                  type="range"
                  ref={TimeRangRef}
                  onChange={updateTime}
                  min="1"
                  max="30"
                  value={Time}
                />
                <div className="rateOfTime">
                  <span>1year</span> <span>30year</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="pieGraph">
              <div className="pieAmount-Display">
               <div>
               <h5> <i class="fa-solid fa-square Principal" ></i>Principal amount</h5>
                <h5>₹ {Principle}</h5>
               </div>
               <div>
               <h5> <i class="fa-solid fa-square " id="Interest"></i> Interest  amount</h5>
                <h5>₹ {Interest}</h5>
               </div>
               <div>
               <h5> Total amount</h5>
                <h5>₹ {Total}</h5>
               </div>
              </div>
              <div className="pie">
                <Pie data={data} options={options} />
              </div>
            </div>
            <div className="FinalAmount">
              <div className="Amount">
                <h2>Your Monthly EMI is ₹ {Emi}</h2>
              </div>
              <div>
                <button onClick={calculateEMI}>Apply for home loan </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Bottom"></div>
      </div>
    </>
  );
}

export default CALCULATOR;

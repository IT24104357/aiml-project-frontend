import React, { useState } from "react";
import API from "../api";

function Prediction() {

  const [food, setFood] = useState("");
  const [result, setResult] = useState("");

  const predict = async () => {

    try {

      const res = await API.get("/predict");

      const item = res.data.find(
        x => x.food.toLowerCase() === food.toLowerCase()
      );

      if(item){
        setResult(item.prediction.Day1);
      }else{
        setResult("Food not found");
      }

    } catch(err){
      setResult("Prediction failed");
    }

  };

  return (
    <div>

      <h2>AI Food Demand Prediction</h2>

      <input
        placeholder="Enter food name"
        value={food}
        onChange={e => setFood(e.target.value)}
      />

      <button onClick={predict}>Predict</button>

      <h3>Recommended Quantity: {result}</h3>

    </div>
  );
}

export default Prediction;
import React from "react";
import { useNavigate } from "react-router-dom";

const ChooseDatabases = () => {
  const navigate = useNavigate();


  return (
    <>
      <h1>Hi</h1>
      <h2>Which databases do you want to look for movies?</h2>

      <div className="wrapper">
        <button onClick={() => navigate("/")}>CUB</button>

        <button onClick={() => navigate("/apimovies")}>OMBD</button>
      </div>
    </>
  );
};

export default ChooseDatabases;

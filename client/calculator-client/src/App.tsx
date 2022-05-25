import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
        <div className="display" style={{backgroundColor: "black"}} >5454+78</div>
        <div className="AC" style={{gridColumn: "1 / 3"}}>AC</div>
        <div className="DEL">DEL</div>     
        <div className="op" style={{backgroundColor: "darkorange"}}>÷</div>
        <div className="btn">1</div>
        <div className="btn">2</div>
        <div className="btn">3</div>
        <div className="op" style={{backgroundColor: "darkorange"}}>*</div>
        <div className="btn">4</div>
        <div className="btn">5</div>
        <div className="btn">6</div>
        <div className="op" style={{backgroundColor: "darkorange"}}>+</div>
        <div className="btn">7</div>
        <div className="btn">8</div>
        <div className="btn">9</div>
        <div className="op" style={{backgroundColor: "darkorange"}}>-</div>
        <div className="dec">.</div>
        <div className="btn">0</div>
        <div className="equal" style={{gridColumn: "3 / 5"}}>=</div>
    </div>
  );
}

export default App;

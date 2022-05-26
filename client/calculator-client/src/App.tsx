import React, { useReducer } from "react";
import "./App.css";

type CalculatorState = {
  operation: string;
  firstOperand: string;
  secondOperand: string;
  displayValue: string;
};

enum ActionType {
  ADD_NUMBER = "ADD_NUMBER",
  DELETE_NUMBER = "DELETE_NUMBER",
  SET_OPERATION = "SET_OPERATION",
  EVALUATE = "EVALUATE",
  CLEAR = "CLEAR",
}

type Action = {
  type: ActionType;
  payload: string;
};

function evaluate({ operation, firstOperand, secondOperand }: CalculatorState) {
  let a = parseFloat(firstOperand);
  let b = parseFloat(secondOperand);

  if (operation === "+") {
    return (a + b).toString();
  } else if (operation === "-") {
    return (a - b).toString();
  } else if (operation === "*") {
    return (a * b).toString();
  } else {
    return (a / b).toString();
  }
}

function reducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case ActionType.ADD_NUMBER:
      if (state.displayValue.includes(".") && action.payload === ".") {
        return state;
      }

      if (state.displayValue === "0" && action.payload === "0") {
        return state;
      }

      if (state.operation === "") {
        return {
          ...state,
          firstOperand: state.firstOperand + action.payload,
          displayValue: state.displayValue + action.payload,
        };
      }

      return {
        ...state,
        secondOperand: state.secondOperand + action.payload,
        displayValue: state.secondOperand + action.payload,
      };

    case ActionType.DELETE_NUMBER:
      if (state.operation) {
        return {
          ...state,
          displayValue: state.displayValue.slice(
            0,
            state.displayValue.length - 1
          ),
          secondOperand: state.displayValue.slice(
            0,
            state.displayValue.length - 1
          ),
        };
      }

      return {
        ...state,
        displayValue: state.displayValue.slice(
          0,
          state.displayValue.length - 1
        ),
      };

    case ActionType.CLEAR:
      return {
        firstOperand: "",
        secondOperand: "",
        operation: "",
        displayValue: "",
      };

    case ActionType.SET_OPERATION:
      if (state.secondOperand) {
        return {
          ...state,
          operation: action.payload,
          firstOperand: evaluate(state),
          secondOperand: "",
          displayValue: evaluate(state),
        };
      }

      return {
        ...state,
        operation: action.payload,
        firstOperand: state.displayValue,
        // displayValue: "",
      };

    case ActionType.EVALUATE:
      if (state.firstOperand && state.secondOperand && state.operation) {
        return {
          operation: "",
          firstOperand: "",
          secondOperand: "",
          displayValue: evaluate(state),
        };
      }

      return state;
  }
}

function App() {
  const [{ displayValue }, dispatch] = useReducer(reducer, {
    operation: "",
    firstOperand: "",
    secondOperand: "",
    displayValue: "",
  });

  return (
    <div className="container">
      <div className="display" style={{ backgroundColor: "black" }}>
        {displayValue || "0"}
      </div>
      <div className="AC" onClick={()=>dispatch({type:ActionType.CLEAR,payload:""})} style={{ gridColumn: "1 / 3" }}>
        AC
      </div>
      <div className="DEL" onClick={()=>dispatch({type:ActionType.DELETE_NUMBER,payload:""})} >DEL</div>
      <div className="op" onClick={()=>dispatch({type:ActionType.SET_OPERATION,payload:"/"})} style={{ backgroundColor: "darkorange" }}>
        ÷
      </div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"1"})}>1</div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"2"})}>2</div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"3"})}>3</div>
      <div className="op" onClick={()=>dispatch({type:ActionType.SET_OPERATION,payload:"*"})} style={{ backgroundColor: "darkorange" }}>
        *
      </div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"4"})}>4</div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"5"})}>5</div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"6"})}>6</div>
      <div className="op" onClick={()=>dispatch({type:ActionType.SET_OPERATION,payload:"+"})} style={{ backgroundColor: "darkorange" }}>
        +
      </div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"7"})}>7</div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"8"})}>8</div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"9"})}>9</div>
      <div className="op" onClick={()=>dispatch({type:ActionType.SET_OPERATION,payload:"-"})} style={{ backgroundColor: "darkorange" }}>
        -
      </div>
      <div className="dec" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"."})}>.</div>
      <div className="btn" onClick={()=>dispatch({type:ActionType.ADD_NUMBER,payload:"0"})}>0</div>
      <div className="equal" onClick={()=>dispatch({type:ActionType.EVALUATE,payload:""})} style={{ gridColumn: "3 / 5" }}>
        =
      </div>
    </div>
  );
}

export default App;

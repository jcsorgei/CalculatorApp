import axios from "axios";
import { useReducer } from "react";
import "./App.css";
import NumberButton from "./components/NumberButton";
import OperationButton from "./components/OperationButton";

export type CalculatorState = {
  operation: string;
  firstOperand: string;
  secondOperand: string;
  displayValue: string;
};

export enum ActionType {
  ADD_NUMBER = "ADD_NUMBER",
  DELETE_NUMBER = "DELETE_NUMBER",
  SET_OPERATION = "SET_OPERATION",
  EVALUATE = "EVALUATE",
  CLEAR = "CLEAR",
  LOAD_MEMORY = "LOAD_MEMORY",
}

export type Action = {
  type: ActionType;
  payload?: string;
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
          operation: action.payload || "",
          firstOperand: evaluate(state),
          secondOperand: "",
          displayValue: evaluate(state),
        };
      }

      return {
        ...state,
        operation: action.payload || "",
        firstOperand: state.displayValue,
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

    case ActionType.LOAD_MEMORY:
      return {
        operation: "",
        firstOperand: "",
        secondOperand: "",
        displayValue: action.payload || "",
      };
  }
}

function App() {
  const getMemory = async (): Promise<void> => {
    try {
      const res = await axios.request({
        url: `http://localhost:3000/memory/`,
        method: "GET",
      });
      const memoryData = res.data.toString();
      if (memoryData) {
        dispatch({ type: ActionType.LOAD_MEMORY, payload: memoryData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveMemory = async (): Promise<void> => {
    try {
      await axios.request({
        url: `http://localhost:3000/memory/`,
        method: "POST",
        data: { value: displayValue },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      <div
        className="SAVE"
        onClick={() => saveMemory()}
        style={{ gridColumn: "1 / 3" }}
      >
        SAVE
      </div>
      <div
        className="LOAD"
        onClick={() => getMemory()}
        style={{ gridColumn: "3 / 5" }}
      >
        LOAD
      </div>
      <div
        className="AC"
        onClick={() => dispatch({ type: ActionType.CLEAR })}
        style={{ gridColumn: "1 / 3" }}
      >
        AC
      </div>
      <div
        className="DEL"
        onClick={() => dispatch({ type: ActionType.DELETE_NUMBER })}
      >
        DEL
      </div>
      <OperationButton operation="÷" dispatch={dispatch}></OperationButton>
      <NumberButton number="1" dispatch={dispatch}></NumberButton>
      <NumberButton number="2" dispatch={dispatch}></NumberButton>
      <NumberButton number="3" dispatch={dispatch}></NumberButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <NumberButton number="4" dispatch={dispatch}></NumberButton>
      <NumberButton number="5" dispatch={dispatch}></NumberButton>
      <NumberButton number="6" dispatch={dispatch}></NumberButton>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <NumberButton number="7" dispatch={dispatch}></NumberButton>
      <NumberButton number="8" dispatch={dispatch}></NumberButton>
      <NumberButton number="9" dispatch={dispatch}></NumberButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <NumberButton number="." dispatch={dispatch}></NumberButton>
      <NumberButton number="0" dispatch={dispatch}></NumberButton>
      <div
        className="equal"
        onClick={() => dispatch({ type: ActionType.EVALUATE })}
        style={{ gridColumn: "3 / 5" }}
      >
        =
      </div>
    </div>
  );
}

export default App;

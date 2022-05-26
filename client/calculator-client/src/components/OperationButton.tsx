import { Action, ActionType } from "../App";

export default function OperationButton(props: {
  operation: string;
  dispatch: (value: Action) => void;
}): JSX.Element {
  const { operation, dispatch } = props;
  return (
    <div
      className="op"
      onClick={() => dispatch({ type: ActionType.SET_OPERATION, payload: operation })}
      style={{ backgroundColor: "darkorange" }}
    >
      {operation}
    </div>
  );
}

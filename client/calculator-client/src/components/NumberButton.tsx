import { Action, ActionType } from "../App";

export default function NumberButton(props: {
  number: string;
  dispatch: (value: Action) => void;
}): JSX.Element {
  const { number, dispatch } = props;
  return (
    <div
      className="btn"
      onClick={() => dispatch({ type: ActionType.ADD_NUMBER, payload: number })}
    >
      {number}
    </div>
  );
}

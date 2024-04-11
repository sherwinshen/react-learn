import { ActionT, ACTION } from "../type";

export default function PrevBtn({ index, dispatch }: { index: number; dispatch: React.Dispatch<ActionT> }) {
  if (index <= 0) {
    return null;
  }
  return (
    <button className="btn btn-ui" style={{ marginRight: "1.2rem" }} onClick={() => dispatch({ type: ACTION.prev })}>
      Prev
    </button>
  );
}

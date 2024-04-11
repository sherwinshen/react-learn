import { ActionT, ACTION } from "../type";

export default function NextBtn({
  index,
  numQuestions,
  hasAnswer,
  dispatch,
}: {
  index: number;
  numQuestions: number;
  hasAnswer: boolean;
  dispatch: React.Dispatch<ActionT>;
}) {
  if (index === numQuestions - 1) {
    return (
      <button className="btn btn-ui" disabled={!hasAnswer} onClick={() => dispatch({ type: ACTION.finish })}>
        Finish
      </button>
    );
  }
  return (
    <button className="btn btn-ui" disabled={!hasAnswer} onClick={() => dispatch({ type: ACTION.next })}>
      Next
    </button>
  );
}

import { ActionT, ACTION } from "../type";

export default function QuizReady({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: React.Dispatch<ActionT>;
}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: ACTION.start })}>
        Let's start
      </button>
    </div>
  );
}

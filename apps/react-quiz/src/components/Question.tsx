import { QuestionT, ActionT, ACTION } from "../type";

export default function Question({
  question,
  answer,
  dispatch,
}: {
  question: QuestionT;
  answer?: number;
  dispatch: React.Dispatch<ActionT>;
}) {
  const hasAnswered = answer !== undefined;

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, optionIndex) => {
          return (
            <button
              className={`btn btn-option ${optionIndex === answer ? "answer" : ""} ${
                hasAnswered ? (optionIndex === question.correctOption ? "correct" : "wrong") : ""
              }`}
              key={option}
              disabled={hasAnswered}
              onClick={() => dispatch({ type: ACTION.answer, payload: optionIndex })}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

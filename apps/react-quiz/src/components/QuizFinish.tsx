import { ActionT, ACTION } from "../type";

export default function QuizFinish({
  dispatch,
  maxPoints,
  points,
  highScore,
}: {
  dispatch: React.Dispatch<ActionT>;
  maxPoints: number;
  points: number;
  highScore: number;
}) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: ACTION.restart })}>
        Restart quiz
      </button>
    </>
  );
}

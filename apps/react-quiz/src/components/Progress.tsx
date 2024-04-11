export default function Progress({
  numQuestions,
  index,
  points,
  maxPoints,
  answers,
}: {
  numQuestions: number;
  index: number;
  points: number;
  maxPoints: number;
  answers: number[];
}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={answers.length} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

import { ActionT, ACTION } from "../type";
import { useEffect } from "react";

export default function Timer({
  dispatch,
  secondsRemaining,
}: {
  dispatch: React.Dispatch<ActionT>;
  secondsRemaining: number;
}) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: ACTION.tick });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

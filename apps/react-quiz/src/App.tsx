import { useEffect, useReducer } from "react";
import { STATUS, ACTION, ActionT, QuestionT } from "./type";
import Header from "./components/Header";
import Error from "./components/Error";
import Loader from "./components/Loader";
import QuizReady from "./components/QuizReady";
import QuizFinish from "./components/QuizFinish";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Timer from "./components/Timer";
import PrevBtn from "./components/PrevBtn";
import NextBtn from "./components/NextBtn";

const initialState = {
  status: STATUS.LOADING,
  questions: [] as QuestionT[],
  answers: [] as number[],
  points: 0,
  highScore: 0,
  index: 0,
  secondsRemaining: 0,
};

const reducer: React.Reducer<typeof initialState, ActionT> = (state, action) => {
  switch (action.type) {
    case ACTION.dataReceived:
      return {
        ...state,
        questions: action.payload as QuestionT[],
        status: STATUS.READY,
      };
    case ACTION.dataFailed:
      return {
        ...state,
        status: STATUS.ERROR,
      };
    case ACTION.start:
      return {
        ...state,
        status: STATUS.ACTIVE,
        secondsRemaining: 300,
      };
    case ACTION.restart:
      return {
        ...initialState,
        questions: state.questions,
        status: STATUS.READY,
      };
    case ACTION.answer:
      if (typeof action.payload !== "number") {
        return state;
      }
      return {
        ...state,
        answers: [...state.answers, action.payload],
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.points + state.questions[state.index].points
            : state.points,
      };
    case ACTION.next:
      return {
        ...state,
        index: state.index + 1,
      };
    case ACTION.prev:
      return {
        ...state,
        index: state.index - 1,
      };
    case ACTION.finish:
      return {
        ...state,
        status: STATUS.FINISHED,
        highScore: state.highScore < state.points ? state.points : state.highScore,
      };
    case ACTION.tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? STATUS.FINISHED : state.status,
      };
    default:
      return state;
  }
};

function App() {
  const [{ status, questions, points, highScore, index, answers, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetch("http://localhost:8001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: ACTION.dataReceived, payload: data }))
      .catch(() => dispatch({ type: ACTION.dataFailed }));
  }, []);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <main className="main">
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.ERROR && <Error />}
        {status === STATUS.READY && <QuizReady numQuestions={numQuestions} dispatch={dispatch} />}
        {status === STATUS.ACTIVE && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              maxPoints={maxPoints}
              answers={answers}
              points={points}
            />
            <Question question={questions[index]} answer={answers[index]} dispatch={dispatch} />
            <footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextBtn
                index={index}
                numQuestions={numQuestions}
                hasAnswer={answers[index] !== undefined}
                dispatch={dispatch}
              />
              <PrevBtn index={index} dispatch={dispatch} />
            </footer>
          </>
        )}
        {status === STATUS.FINISHED && (
          <QuizFinish maxPoints={maxPoints} points={points} highScore={highScore} dispatch={dispatch} />
        )}
      </main>
    </div>
  );
}

export default App;

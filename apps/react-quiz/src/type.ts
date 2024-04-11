export enum STATUS {
  READY = "READY",
  LOADING = "LOADING",
  ERROR = "ERROR",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export enum ACTION {
  dataReceived = "dataReceived",
  dataFailed = "dataFailed",
  start = "start",
  restart = "restart",
  answer = "answer",
  next = "next",
  prev = "prev",
  finish = "finish",
  tick = "tick",
}

export type QuestionT = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type ActionT = {
  type: ACTION;
  payload?: QuestionT[] | number;
};

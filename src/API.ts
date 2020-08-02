import { shuffleArray } from "./util";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & {
  answers: string[];
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (options: {
  number: number;
  category: string;
  difficulty: string;
  type: string;
}) => {
  const { number, category, difficulty, type } = options;
  let queryParams = `amount=${number}`;
  if (category !== "any") {
    queryParams += `&category=${category}`;
  }
  if (difficulty !== "any") {
    queryParams += `&difficulty=${difficulty}`;
  }
  if (type !== "any") {
    queryParams += `&type=${type}`;
  }
  console.log({ queryParams });
  const endPoint = `https://opentdb.com/api.php?${queryParams}`;
  const data = await (await fetch(endPoint)).json();

  return data.results.map((question: Question) => {
    return {
      ...question,
      answers: shuffleArray([question.correct_answer, ...question.incorrect_answers]),
    };
  });
};

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import Navheader from "./Navheader";
import StartPage from "./StartPage";
import ImmediateResult from "./ImmediateResult";
import { Container, Button } from "react-bootstrap";
import { fetchQuizQuestions, QuestionState, AnswerObject } from "./API";

const App = (): JSX.Element => {
  const [TOTAL_QUESTIONS, setTotalQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(-1);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const resetGame = () => {
    setNumber(-1);
  };

  const startTrivia = (options: {
    number: number;
    category: string;
    difficulty: string;
    type: string;
  }) => async (): Promise<void> => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(options);
    setTotalQuestions(options.number);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObject: AnswerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correct_answer,
        answer,
        correct,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = (): void => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
    } else {
      setNumber(nextQuestion);
    }
  };

  const renderQuestions = () => {
    if (loading) {
      return <p>Loading questions...</p>;
    } else {
      if (gameOver) {
      } else {
        let nextButton = null;
        if (userAnswers.length === number + 1 && number === TOTAL_QUESTIONS - 1) {
          nextButton = (
            <Button className="next" onClick={resetGame}>
              Start new game
            </Button>
          );
        } else if (userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1) {
          nextButton = (
            <Button className="next" onClick={nextQuestion}>
              Next Question
            </Button>
          );
        }
        return (
          <>
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
            <ImmediateResult userAnswer={userAnswers[number]} />
            {nextButton}
          </>
        );
      }
    }
  };

  return (
    <Container className="game-container" fluid>
      <Navheader score={score} />
      {number === -1 ? <StartPage startTrivia={startTrivia} /> : null}
      {renderQuestions()}
    </Container>
  );
};

export default App;

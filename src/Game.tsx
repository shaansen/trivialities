import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import Navheader from "./Navheader";
import { Container, Button, Badge } from "react-bootstrap";
import { fetchQuizQuestions, Difficulty, QuestionState, AnswerObject } from "./API";

const TOTAL_QUESTIONS = 2;

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async (): Promise<void> => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
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
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const renderQuestions = () => {
    if (loading) {
      return <p>Loading questions...</p>;
    } else {
      if (gameOver || userAnswers.length === TOTAL_QUESTIONS) {
      } else {
        let nextButton = null;
        if (userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1) {
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
            {nextButton}
          </>
        );
      }
    }
  };

  console.log(gameOver, userAnswers);

  return (
    <Container className="game-container" fluid>
      <Navheader score={score} gameOver={gameOver} />
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <div className="start-page">
          <Button className="start" onClick={startTrivia}>
            Start
          </Button>
        </div>
      ) : null}
      {renderQuestions()}
    </Container>
  );
};

export default App;

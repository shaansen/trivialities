import React, { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import { Container, Button } from "react-bootstrap";
import { fetchQuizQuestions, QuestionState, AnswerObject, OptionsType } from "./API";
import { Link } from "react-router-dom";

const App = (): JSX.Element => {
  const [TOTAL_QUESTIONS, setTotalQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(-1);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      let params = new URLSearchParams(document.location.search.substring(1));
      let options = ({
        number: params?.get("number") || 5,
        type: params?.get("type") || "any",
        difficulty: params?.get("difficulty") || "any",
        category: params?.get("category") || "any",
      } as unknown) as OptionsType;
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(options);
      setTotalQuestions(Number(options.number));
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    }
    // Execute the created function directly
    anyNameFunction();
  }, []);

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
            <Button className="next">
              <Link to="/">Start new game</Link>
            </Button>
          );
        } else if (userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1) {
          nextButton = (
            <Button size="lg" className="next" onClick={nextQuestion}>
              Next Question
            </Button>
          );
        }
        return (
          <>
            <QuestionCard
              score={score}
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
            <div className="footer">
              {userAnswers[number] && (
                <h1>{userAnswers[number].correct ? "CORRECT" : "INCORRECT"}</h1>
              )}
              {nextButton}
            </div>
          </>
        );
      }
    }
  };

  return (
    <Container className="game-container" fluid>
      {renderQuestions()}
    </Container>
  );
};

export default App;

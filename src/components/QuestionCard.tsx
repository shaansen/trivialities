import React from "react";
import { AnswerObject } from "../API";
import { Button, Badge, Container } from "react-bootstrap";

type Props = {
  score: number;
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const evaluateClass = (userAnswer: AnswerObject | undefined, answer: string): string => {
  if (userAnswer === undefined) {
    return "";
  }

  if (userAnswer.correct) {
    if (userAnswer.correctAnswer === answer) {
      return "correct highlight";
    }
  } else {
    if (answer === userAnswer.correctAnswer) {
      return "correct";
    } else if (answer === userAnswer.answer) {
      return "incorrect highlight";
    }
  }

  return "";
};

const QuestionCard: React.FC<Props> = ({
  score,
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="question-card">
      <Container fluid className="question-detail-header">
        <h5 className="number">{`Question: ${questionNumber}/${totalQuestions}`}</h5>
        <Badge className="score-badge" variant="secondary">
          Score: {score}
        </Badge>
      </Container>
      <h2 className="number" dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer, i) => (
          <div key={i}>
            <Button
              className={`options ${evaluateClass(userAnswer, answer)}`}
              disabled={!!userAnswer}
              value={answer}
              onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;

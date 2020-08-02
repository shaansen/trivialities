import React from "react";
import { AnswerObject } from "../API";
import { Button } from "react-bootstrap";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <div className="question-card">
    <h4 className="number">{`Question: ${questionNumber}/${totalQuestions}`}</h4>
    <h2 className="number" dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer, i) => (
        <div key={i}>
          <Button className="options" disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </Button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;

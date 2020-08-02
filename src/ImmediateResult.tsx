import * as React from "react";
import { AnswerObject } from "./API";

const ImmediateResult = (props: { userAnswer: AnswerObject | undefined }) => {
  const { userAnswer } = props;
  let text = null;
  if (!!userAnswer) {
    const { correct } = userAnswer;
    if (correct) {
      text = "CORRECT";
    } else {
      text = "INCORRECT";
    }
  }
  return (
    <div className="immediate-result">
      <h1>{text}</h1>
    </div>
  );
};

export default ImmediateResult;

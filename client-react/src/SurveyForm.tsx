import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { RequestSaveSurvey, shouldOptOut } from "./Questions";
import AllQuestions, {
  ChoiceQuestion,
  InputQuestion,
  Question,
  SurveyGroups,
} from "./Questions";

//TODO: Added final question Model/Make plus regex
//TODO: Compile Graphs

export default function SurveyForm() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>(AllQuestions);

  const question = questions[questionIndex];

  useEffect(() => {
    const question = questions[questionIndex];
    if (question && question.canShow && question.canShow(questions)) {
      console.log(question && question.canShow(questions));
      setQuestionIndex((index) => index + 1);
    }
  }, [questionIndex, questions]);

  if (questionIndex >= questions.length) {
    return (
      <EndOfSurvey
        groupId={SurveyGroups.OTHER_RESPONDENTS}
        questions={questions}
        message={"Thank you for taking the time to take the survey."}
      />
    );
  }

  if (questionIndex > 0) {
    const optOut = shouldOptOut({
      lastQuestionAnswered: questions[questionIndex - 1],
      questions: questions,
    });

    if (optOut) {
      return (
        <EndOfSurvey
          questions={questions}
          message={optOut.message}
          groupId={optOut.groupId}
        />
      );
    }
  }

  const submitAnswer = (value: string) => {
    question.answer = value;
    questions[questionIndex] = question;
    setQuestions(questions);
    setQuestionIndex((questionIndex) => questionIndex + 1);
  };

  const getInput = () => {
    if (question.type === "input") {
      const quest = question as InputQuestion;
      return (
        <Input
          validate={quest.validate}
          validationMessage={quest.validationMessage}
          regex={quest.regex}
          onNextClick={submitAnswer}
        />
      );
    }
    if (question.type === "choice") {
      const quest = question as ChoiceQuestion;
      return (
        <Choices
          onNextClick={submitAnswer}
          options={quest.choices.map((answer, index) => {
            return { index: index, value: answer };
          })}
        />
      );
    }
  };

  return (
    <div className="container p-4">
      <header className="d-flex justify-content-center mb-4 text-white">
        <h3>Survey</h3>
      </header>
      <div className="card rounded">
        <div className="card-body">
          <div className="col">
            <div className="row">
              <div className="d-flex justify-content-start">
                <div className="d-flex justify-content-center">
                  <div className="row-12 justify-content-center">
                    <h3 className="my-0 p-0">
                      {questionIndex < 10
                        ? `0${questionIndex + 1}`
                        : questionIndex + 1}
                    </h3>
                    <div
                      className="row-12 justify-content-center"
                      style={{ height: "0.25rem", backgroundColor: "#58CBB3" }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center ms-2">
                  <small className="text-muted"> of 09</small>
                </div>
              </div>
            </div>
            <div className="row mt-3 px-2">
              <h5 className="px-0">{question.title}</h5>
              {getInput()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EndOfSurvey(props: {
  questions: Question[];
  message: string;
  groupId: number;
}) {
  useEffect(() => {
    const save = async () => {
      const requestBody: RequestSaveSurvey = new RequestSaveSurvey(
        "survey_vehicle_01",
        props.groupId,
        props.questions
      );

      await fetch(`${process.env.REACT_APP_API_URL}/surveys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: requestBody.data,
          surveyId: requestBody.surveyId,
          groupId: requestBody.groupId,
        }),
      });
    };

    save();
  }, [props.groupId, props.questions]);

  return (
    <div className="container p-4">
      <header className="d-flex justify-content-center mb-4 text-white">
        <h3>Survey</h3>
      </header>
      <div className="card rounded">
        <div className="card-body">
          <div className="col">
            <div className="row">
              <div className="d-flex justify-content-start">
                <div className="d-flex justify-content-center">
                  <div className="row-12 justify-content-center">
                    <h3 className="my-0 p-0">Complete</h3>
                    <div
                      className="row-12 justify-content-center"
                      style={{ height: "0.25rem", backgroundColor: "#58CBB3" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3 px-2">
              <h5 className="px-0">
                {props.message
                  ? props.message
                  : "Thanks for taking the time to take the survey!"}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  defaultValue = "",
  validate,
  validationMessage,
  regex,
  onNextClick,
}: {
  defaultValue?: string;
  validate: (value: string) => boolean;
  regex: RegExp;
  validationMessage: string;
  onNextClick: (value: string) => void;
}) {
  const [value, setValue] = useState<string>(defaultValue);
  const [focused, setFocused] = useState<boolean>(false);

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => setIsValid(validate(value)), [value]);

  return (
    <div className="w-100">
      <div
        className="w-100 border-0 mt-2 p-2 rounded"
        style={{
          backgroundColor: focused
            ? Colors.background.selected
            : Colors.background.default,
          color: focused ? Colors.input.selected : Colors.input.default,
        }}
      >
        <input
          pattern="[0-9]"
          type="text"
          className="w-100 border-0 text-start"
          style={{
            backgroundColor: "inherit",
            outline: "none",
            color: "inherit",
          }}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              if (isValid) {
                onNextClick(value);
              }
            }
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (regex.test(e.target.value)) {
              setValue(e.target.value);
            }
          }}
        />
      </div>
      {focused && !isValid && (
        <span className="text-small text-danger">{validationMessage}</span>
      )}

      <div>
        <button
          style={{
            backgroundColor: Colors.background.selected,
            borderColor: Colors.background.default,
            outline: "none",
          }}
          className="rounded mt-2 border-0 px-2"
          onClick={() => onNextClick(value)}
          disabled={!isValid}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export interface SelectProps {
  onNextClick: (value: string) => void;
  options: { index: number; value: string }[];
}

function Choices({ options, onNextClick }: SelectProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const onClick = (index: number) => {
    setSelectedIndex(index);
    onNextClick(options[index].value);
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [options]);

  return (
    <React.Fragment>
      {options.map((option, index) => (
        <Option
          key={option.value}
          value={option.value}
          selected={index === selectedIndex}
          onClick={() => onClick(index)}
        />
      ))}
    </React.Fragment>
  );
}

function Option({
  value,
  selected = false,
  onClick,
}: {
  value: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="w-100 border-0 mt-2 p-2 rounded"
      style={{
        backgroundColor: selected
          ? Colors.background.selected
          : Colors.background.default,
        color: selected ? Colors.input.selected : Colors.input.default,
      }}
    >
      <button
        className="w-100 border-0 text-start"
        style={{
          backgroundColor: "inherit",
          outline: "none",
          color: "inherit",
        }}
        value={value}
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
}

const Colors = {
  background: {
    selected: "#ebf8f7",
    default: "#fafafa",
  },
  input: {
    selected: "#9adccd",
    default: "#c9c9c9",
  },
};

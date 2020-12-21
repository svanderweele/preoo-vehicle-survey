type QuestionKey =
  | "age"
  | "gender"
  | "doesOwnDrivingLicense"
  | "isFirstCar"
  | "driveTrainPreference"
  | "isWorriedAboutFuelEmission"
  | "carCountInFamily"
  | "carData";

export interface RequestSaveSurvey {
  surveyId: string;
  data: {
    age?: string;
    gender?: string;
    doesOwnDrivingLicense?: string;
    isFirstCar?: string;
    driveTrainPreference?: string;
    isWorriedAboutFuelEmission?: string;
    carCountInFamily?: string;
    carData?: { make: string; model: string }[];
  };
}

export class RequestSaveSurvey {
  constructor(surveyId: "survey_vehicle_01", questions: Question[]) {
    this.surveyId = surveyId;
    this.data = {
      age: getAnswer(questions, "age"),
      gender: getAnswer(questions, "gender"),
      doesOwnDrivingLicense: getAnswer(questions, "doesOwnDrivingLicense"),
      isFirstCar: getAnswer(questions, "isFirstCar"),
      driveTrainPreference: getAnswer(questions, "driveTrainPreference"),
      isWorriedAboutFuelEmission: getAnswer(
        questions,
        "isWorriedAboutFuelEmission"
      ),
      carCountInFamily: getAnswer(questions, "carCountInFamily"),
    };
  }
}

function getAnswer(
  questions: Question[],
  key: QuestionKey
): string | undefined {
  const matching = questions.filter((question) => question.key === key);

  if (matching.length === 0) {
    return undefined;
  }

  return matching[0].answer;
}

export function shouldOptOut({
  lastQuestionAnswered,
  questions,
}: {
  lastQuestionAnswered: Question;
  questions: Question[];
}): string | null {
  if (lastQuestionAnswered.key === "gender") {
    const age = getAnswer(questions, "age");
    if (age && parseInt(age) < 18) {
      return "Thank you for taking the time to submit the survey.";
    }
  }

  if (lastQuestionAnswered.key === "doesOwnDrivingLicense") {
    const doesOwnDrivingLicense = getAnswer(questions, "doesOwnDrivingLicense");
    if (doesOwnDrivingLicense && doesOwnDrivingLicense !== "Yes") {
      return "Thank you for taking the time to submit the survey.";
    }
  }

  if (lastQuestionAnswered.key === "isFirstCar") {
    const isFirstCar = getAnswer(questions, "isFirstCar");
    if (isFirstCar && isFirstCar === "Yes") {
      return "We are targeting more experienced clients, thank you for your interest!";
    }
  }

  return null;
}

export class Question {
  title: string;
  key: QuestionKey;
  type: "input" | "choice" | "car_select";
  answer: string | undefined;
  canShow?: (questions: Question[]) => boolean;

  constructor(
    key: QuestionKey,
    title: string,
    type: "input" | "choice" | "car_select",
    canShow?: (questions: Question[]) => boolean
  ) {
    this.title = title;
    this.type = type;
    this.answer = undefined;
    this.key = key;
    this.canShow = canShow;
  }
}

export class InputQuestion extends Question {
  validate: (value: string) => boolean;
  regex: RegExp;
  validationMessage: string;

  constructor(
    key: QuestionKey,
    title: string,
    validate: (value: string) => boolean,
    regex: RegExp,
    validationMessage: string,
    canShow?: (questions: Question[]) => boolean
  ) {
    super(key, title, "input", canShow);
    this.validate = validate;
    this.regex = regex;
    this.validationMessage = validationMessage;
  }
}

export class ChoiceQuestion extends Question {
  choices: string[];

  constructor(
    key: QuestionKey,
    title: string,
    choices: string[],
    canShow?: (questions: Question[]) => boolean
  ) {
    super(key, title, "choice", canShow);
    this.choices = choices;
  }
}

const questions: Question[] = [
  new InputQuestion(
    "age",
    "What is your age?",
    (value) => value !== "" && parseInt(value) > 0,
    /^(|[0-9])+$/,
    "Age must be greater than 0"
  ),
  new ChoiceQuestion("gender", "What is your gender?", [
    "Male",
    "Female",
    "Other",
  ]),

  new ChoiceQuestion(
    "doesOwnDrivingLicense",
    "Do you own a car driving licence?",
    ["Yes", "No, I prefer to use other transport"]
  ),

  new ChoiceQuestion(
    "isFirstCar",
    "Is this your first car?",
    ["Yes", "No"],
    (questions) => {
      const age = getAnswer(questions, "age");
      if (age) {
        const parsedAge = parseInt(age);
        return parsedAge >= 18 && parsedAge <= 25;
      }

      return true;
    }
  ),
  new ChoiceQuestion(
    "driveTrainPreference",
    "Which drivetrain do you prefer?",
    ["FWD", "RWD", "I don't know"]
  ),
  new ChoiceQuestion(
    "isWorriedAboutFuelEmission",
    "Are you worried about fuel emissions?",
    ["Yes", "No"]
  ),
  new InputQuestion(
    "carCountInFamily",
    "How many cars do you have in your family?",
    (value) => true,
    /^(|[0-9])+$/,
    ""
  ),
];

export default questions;

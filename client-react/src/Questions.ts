type QuestionKey = "age" | "gender" | "doesOwnDrivingLicense" | "isFirstCar";

/*
"surveyId": "survey_vehicle_01",
	"data": {
		"age": 24,
		"gender": "Male",
		"doesOwnDrivingLicense": true,
		"isFirstCar": false,
		"driveTrainPreference": "FWD",
		"isWorriedAboutFuelEmission": true,
		"carCountInFamily": 3,
		"carData": [
			{
				"make": "Vauxhall",
				"model": "Mocha"
			},
			{
				"make": "Toyota",
				"model": "Vitz"
			}
		]
	}
*/

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
      age: this.getAnswer(questions, "age"),
      gender: this.getAnswer(questions, "gender"),
      doesOwnDrivingLicense: this.getAnswer(questions, "doesOwnDrivingLicense"),
      isFirstCar: this.getAnswer(questions, "isFirstCar"),
    };
  }

  getAnswer(questions: Question[], key: QuestionKey): string | undefined {
    const matching = questions.filter((question) => question.key === key);

    if (matching.length === 0) {
      return undefined;
    }

    return matching[0].answer;
  }
}

export class Question {
  title: string;
  key: QuestionKey;
  type: "input" | "choice" | "car_select";
  answer: string | undefined;

  constructor(
    key: QuestionKey,
    title: string,
    type: "input" | "choice" | "car_select"
  ) {
    this.title = title;
    this.type = type;
    this.answer = undefined;
    this.key = key;
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
    validationMessage: string
  ) {
    super(key, title, "input");
    this.validate = validate;
    this.regex = regex;
    this.validationMessage = validationMessage;
  }
}

export class ChoiceQuestion extends Question {
  choices: string[];

  constructor(key: QuestionKey, title: string, choices: string[]) {
    super(key, title, "choice");
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

  new ChoiceQuestion("isFirstCar", "Is this your first car?", ["Yes", "No"]),
];

export default questions;

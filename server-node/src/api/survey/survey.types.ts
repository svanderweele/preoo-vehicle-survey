export interface SurveyDataVehicle01Data {
  make: string;
  model: string;
}

export interface SurveyDataVehicle01 {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  doesOwnDrivingLicense: boolean;
  isFirstCar: boolean;
  driveTrainPreference: 'FWD' | 'RWD' | 'Unsure';
  isWorriedAboutFuelEmission: boolean;
  carCountInFamily: number;
  carData: SurveyDataVehicle01Data[];
}

export type SurveyIds = 'survey_vehicle_01';

export type SurveyErrorCode = 'SURVEY_NOT_FOUND';

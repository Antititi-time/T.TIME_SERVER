export interface createTeamDto {
  teamName: string;
  teamMember: number;
}

export interface participateTeamDto {
  nickname: string;
}

export interface checkUserHappinessDto {
  isCompleted: boolean;
}

export interface createAnswerDto {
  questionType: string;
  questionNumber: number;
  answer: string;
  grade: number;
  teamId: number;
}

export interface responseAnswerDto extends createAnswerDto {
  id: number;
}

export type FromEndDateData = {
  id: number;
  summary: string;
  desc: string;
  start: string;
  end: string;
  attendees: any;
  status: any;
  comment: any;
  score: Score;
  link: string;
  user_det: UserDet;
  job_id: JobId;
};

export type Score = {
  P?: number;
};

export type UserDet = {
  id: number;
  question_score: any;
  status: any;
  candidate: Candidate;
  handled_by: HandledBy;
  job_id: JobId;
};

export type Candidate = {
  id: number;
  candidate_firstName: string;
  candidate_lastName: string;
  candidateGender: string;
  candidateComment: string;
  candidate_email: string;
};

export type HandledBy = {
  id: number;
  last_login: any;
  userEmail: string;
  username: string;
  firstName: string;
  lastName: string;
  userRole: string;
};

export type JobId = {
  id: number;
  jobRequest_Title: string;
  jobRequest_Role: string;
  jobRequest_KeySkills: string;
  jobRequest_Description: string;
};

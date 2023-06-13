import { UserInterface } from 'interfaces/user';
import { JobPostingInterface } from 'interfaces/job-posting';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  candidate_id: string;
  job_posting_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  job_posting?: JobPostingInterface;
  _count?: {};
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  candidate_id?: string;
  job_posting_id?: string;
  status?: string;
}

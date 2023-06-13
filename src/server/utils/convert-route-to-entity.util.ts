const mapping: Record<string, string> = {
  applications: 'application',
  companies: 'company',
  employees: 'employee',
  'job-postings': 'job_posting',
  users: 'user',
  'vacation-requests': 'vacation_request',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

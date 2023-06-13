import * as yup from 'yup';
import { vacationRequestValidationSchema } from 'validationSchema/vacation-requests';

export const employeeValidationSchema = yup.object().shape({
  salary: yup.number().integer().required(),
  vacation_days: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
  vacation_request: yup.array().of(vacationRequestValidationSchema),
});

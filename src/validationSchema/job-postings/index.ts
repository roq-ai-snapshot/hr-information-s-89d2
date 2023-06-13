import * as yup from 'yup';
import { applicationValidationSchema } from 'validationSchema/applications';

export const jobPostingValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  requirements: yup.string().required(),
  status: yup.string().required(),
  company_id: yup.string().nullable().required(),
  application: yup.array().of(applicationValidationSchema),
});

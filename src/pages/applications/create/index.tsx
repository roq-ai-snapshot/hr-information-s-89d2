import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createApplication } from 'apiSdk/applications';
import { Error } from 'components/error';
import { applicationValidationSchema } from 'validationSchema/applications';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { JobPostingInterface } from 'interfaces/job-posting';
import { getUsers } from 'apiSdk/users';
import { getJobPostings } from 'apiSdk/job-postings';
import { ApplicationInterface } from 'interfaces/application';

function ApplicationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ApplicationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createApplication(values);
      resetForm();
      router.push('/applications');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ApplicationInterface>({
    initialValues: {
      status: '',
      candidate_id: (router.query.candidate_id as string) ?? null,
      job_posting_id: (router.query.job_posting_id as string) ?? null,
    },
    validationSchema: applicationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Application
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'candidate_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<JobPostingInterface>
            formik={formik}
            name={'job_posting_id'}
            label={'Select Job Posting'}
            placeholder={'Select Job Posting'}
            fetcher={getJobPostings}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'application',
  operation: AccessOperationEnum.CREATE,
})(ApplicationCreatePage);

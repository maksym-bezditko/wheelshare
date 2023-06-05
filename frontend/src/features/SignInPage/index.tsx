import "./index.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useCallback } from "react";
import * as Yup from 'yup';
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../hooks/useRequest";

type Values = {
  email: string;
  password: string;
};

const initialFormState: Values = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
	email: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required')
		.matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
});

const SignInPage = () => {
  const navigate = useNavigate();

  const { signIn } = useRequest();

  const handleSubmit = useCallback(async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
    try {
      const res = await signIn(values);

      if (res) {
        return navigate('/profile');
      }

      throw new Error('Incorrect user data');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
      resetForm();
    }
	}, [navigate, signIn]);

  return (
    <>
      <Header />
      <main className="description-wrapper form-wrapper">
        <Formik
          initialValues={initialFormState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
        >
          {renderForm}
        </Formik>
      </main>
    </>
  );
};

const renderForm = ({ isSubmitting }: { isSubmitting: boolean }) => (
	<Form className="form">
		<div className="form-group">
			<label htmlFor="email">Enter your email</label>
			<Field name="email" type="text" className="form-input" />

			<ErrorMessage name="email">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<div className="form-group withMarginTop">
			<label htmlFor="password">Enter password</label>
			<Field name="password" type="password" className="form-input"/>
		</div>

    <div className="centered-button-wrapper">
		  <button className="header-button go-button centered-button" disabled={isSubmitting} type="submit">Sign in!</button>
    </div>
	</Form>
);

export default SignInPage;
import "./index.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useCallback } from "react";
import * as Yup from 'yup';
import Header from "../../components/Header";

type Values = {
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  bank: string,
  cardNumber: string;
  cardTerm: string;
  cvv: string;
  password: string;
};

const initialFormState: Values = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  bank: '',
  cardNumber: '',
  cardTerm: '',
  cvv: '',
  password: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string()
		.min(4, "Can't be less than four symbols")
		.required('Required'),
  lastName: Yup.string()
		.min(4, "Can't be less than four symbols")
		.required('Required'),
  dateOfBirth: Yup.string()
		.required('Required'),
  password: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required'),
  bank: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required'),
	email: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required')
		.matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
});

const SignUpPage = () => {
  const handleSubmit = useCallback(async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
		// const { email, password } = values;


		setSubmitting(false);
		resetForm();
	}, []);

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
			<label htmlFor="firstName">Enter your firstname</label>
			<Field name="firstName" type="text" className="form-input" placeholder="Your firstname"/>

			<ErrorMessage name="firstName">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

    <div className="form-group withMarginTop">
			<label htmlFor="lastName">Enter your last name</label>
			<Field name="lastName" type="text" className="form-input" placeholder="Your lastname" />

			<ErrorMessage name="lastName">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

    <div className="form-group withMarginTop">
			<label htmlFor="dateOfBirth">Enter your date of birth</label>
			<Field name="dateOfBirth" type="date" className="form-input" placeholder="Your date of birth" />

			<ErrorMessage name="dateOfBirth">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<div className="form-group withMarginTop">
			<label htmlFor="email">Enter your email</label>
			<Field name="email" type="text" className="form-input" placeholder="Your email" />

			<ErrorMessage name="email">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

    <div className="form-group withMarginTop">
			<label htmlFor="bank">Enter the name of your bank</label>
			<Field name="bank" type="text" className="form-input" placeholder="Your bank's name" />

			<ErrorMessage name="bank">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

    <div className="form-group withMarginTop">
			<label htmlFor="cardNumber">Enter your card number</label>
			<Field name="cardNumber" className="form-input" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="XXXXXXXXXXXXXXXX"/>

			<ErrorMessage name="cardNumber">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

    <div className="form-group withMarginTop">
			<label htmlFor="cardTerm">Enter your card term</label>
			<Field name="cardTerm" type="text" className="form-input" placeholder="XX / XX" />

			<ErrorMessage name="cardTerm">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

    <div className="form-group withMarginTop">
			<label htmlFor="cvv">Enter your cvv</label>
			<Field name="cvv" type="text" className="form-input" placeholder="XXX" />

			<ErrorMessage name="cvv">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<div className="form-group withMarginTop">
			<label htmlFor="password">Enter password</label>
			<Field name="password" type="password" className="form-input" placeholder="Your password"/>

      <ErrorMessage name="password">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

    <div className="centered-button-wrapper">
		  <button className="header-button go-button centered-button" disabled={isSubmitting} type="submit">Sign up!</button>
    </div>
	</Form>
);

export default SignUpPage;
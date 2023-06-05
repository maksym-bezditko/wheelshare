import "./index.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useCallback } from "react";
import * as Yup from 'yup';
import Header from "../../components/Header";
import { useRequest } from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../models/routes";

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
	cardNumber: Yup.string()
		.length(16, "Should be of card number format")
		.required('Required'),
	cardTerm: Yup.string()
		.matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/, 'Invalid format')
		.required('Required'),
  password: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required'),
  bank: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required'),
	cvv: Yup.string()
	.length(3, "Should be 3 symbols long")
	.required('Required'),
	email: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required')
		.matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
});

const SignUpPage = () => {
	const { signUp, checkEmail } = useRequest();

	const navigate = useNavigate();

  const handleSubmit = useCallback(async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
		try {
			const emailRes = await checkEmail(values.email);

			if (!emailRes) throw new Error("User with this email exists! Try another one.");

			const res = await signUp({
				...values,
				rentedCars: [],
				bookmarkedCars: [],
			});

			if (res) {
				setSubmitting(false);
				resetForm();
				return navigate(Routes.PROFILE);
			}

			throw new Error('Incorrect user data');
		} catch (e: any) {
			alert(e.message);
		}
	}, [checkEmail, navigate, signUp]);

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
			<Field name="cardNumber" className="form-input" type="number" maxlength="16" placeholder="XXXXXXXXXXXXXXXX"/>

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
			<label htmlFor="cvv">Enter your CVV</label>
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
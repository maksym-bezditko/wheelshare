import LandingPage from "../features/LandingPage";
import SignInPage from "../features/SignInPage";
import SignUpPage from "../features/SignUpPage";

enum Routes {
  HOME = '/',
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

export const publicRoutes = [
	{
		path: Routes.HOME,
		component: <LandingPage />
	},
  {
		path: Routes.SIGN_IN,
		component: <SignInPage />
	},
  {
		path: Routes.SIGN_UP,
		component: <SignUpPage />
	},
]
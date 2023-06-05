import LandingPage from "../features/LandingPage";
import SignInPage from "../features/SignInPage";
import SignUpPage from "../features/SignUpPage";
import ProfilePage from "../features/Profile";
import CarList from "../features/CarList";

type Route = {
	path: Routes,
	component: JSX.Element,
}

export enum Routes {
  HOME = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
	PROFILE = '/profile',
	CARS = '/cars',
	MY_CARS = '/my-cars',
	BOOKMARKS = '/bookmarks',
}

export const signedInRoutes: Route[] = [
	{
		path: Routes.PROFILE,
		component: <ProfilePage />
	},
	{
		path: Routes.CARS,
		component: <CarList />
	},
	{
		path: Routes.MY_CARS,
		component: <CarList />
	},
	{
		path: Routes.BOOKMARKS,
		component: <CarList />
	},
	{
		path: Routes.HOME,
		component: <LandingPage />
	},
]

export const signedOutRoutes: Route[] = [
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
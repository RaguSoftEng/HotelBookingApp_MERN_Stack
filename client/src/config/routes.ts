import IRoute from '../interfaces/Route.interface';
import Property from '../pages/Property';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Room from '../pages/Room';
import Home from '../pages/Home';

const authRoutes: IRoute[] = [
	{
		path: '/view',
		auth: false,
		component: Property,
		name: 'Property_view'
	},
	{
		path: '/register',
		auth: false,
		component: Register,
		name: 'Register'
	},
	{
		path: '/login',
		auth: false,
		component: Login,
		name: 'Login'
	}
];
const clientRoutes: IRoute[] = [
	{
		path: '/booking',
		auth: true,
		component: Property,
		name: 'Booking'
	}
];

const adminRoutes: IRoute[] = [
	{
		path: '/property',
		auth: true,
		component: Property,
		name: 'Property'
	},
	{
		path: '/rooms',
		auth: true,
		component: Room,
		name: 'Room'
	}
];

const mainRoutes: IRoute[] = [
	{
		path: '/',
		auth: false,
		component: Home,
		name: 'Home'
	}
];

const routes: IRoute[] = [...authRoutes, ...clientRoutes, ...adminRoutes, ...mainRoutes];

export default routes;

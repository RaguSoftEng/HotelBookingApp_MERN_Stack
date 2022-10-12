import { Dispatch } from 'redux';
import * as actions from '../constants/User.Constants';
import axios from 'axios';
import { IUserLogin, IUserRegister } from '../../interfaces/User.interface';
const API_URL = 'http://localhost:8082';

export const login = (user: IUserLogin) => async (dispatch: Dispatch) => {
	try {
		dispatch({ type: actions.USER_LOGIN_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post(`${API_URL}/api/users/auth`, user, config);

		dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data.response });

		localStorage.setItem('userInfo', JSON.stringify(data.response));
	} catch (error: any) {
		dispatch({
			type: actions.USER_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const logout = () => (dispatch: Dispatch) => {
	dispatch({ type: actions.USER_LOGOUT });
	localStorage.removeItem('userInfo');
};

export const register = (user: IUserRegister) => async (dispatch: Dispatch) => {
	try {
		dispatch({ type: actions.USER_REGISTER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post(`${API_URL}/api/users`, user, config);

		dispatch({ type: actions.USER_REGISTER_SUCCESS });
		dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data.response });

		localStorage.setItem('userInfo', JSON.stringify(data.response));
	} catch (error: any) {
		dispatch({
			type: actions.USER_REGISTER_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const fetchUsers = () => async (dispatch: Dispatch, getState: any) => {
	try {
		dispatch({ type: actions.FETCH_USERS_REQUEST });

		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		const { data } = await axios.get(`${API_URL}/api/users`, config);

		dispatch({ type: actions.FETCH_USERS_SUCCESS, payload: data.response });
	} catch (error: any) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		if (message === 'no token, no auth') {
			dispatch<any>(logout());
		}
		dispatch({
			type: actions.FETCH_USERS_FAIL,
			payload: message
		});
	}
};

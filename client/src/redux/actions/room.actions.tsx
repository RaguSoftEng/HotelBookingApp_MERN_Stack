import axios from 'axios';
import { Dispatch } from 'redux';
import * as actions from '../constants/RoomConstants';
import { IRoom } from '../../interfaces/Room.interface';
const API_URL = 'http://localhost:8082';

export const fetchRooms = (property: string, dateFrom: string, dateTo: string) => async (dispatch: Dispatch) => {
	try {
		dispatch({ type: actions.FETCH_ROOMS_REQUEST });


        const filter = {
            checkinAt: dateFrom,
            checkoutAt : dateTo
        }

		const { data } = await axios.get(`${API_URL}/api/properties/${property}/availabilities`,{
            params:filter
        });

		dispatch({ type: actions.FETCH_ROOMS_SUCCESS, payload: data.response });
	} catch (error: any) {
		dispatch({
			type: actions.FETCH_ROOMS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const fetchProperties = () => async (dispatch: Dispatch) => {
	try {
		dispatch({ type: actions.FETCH_PROPERTIES_REQUEST });

		const { data } = await axios.get(`${API_URL}/api/properties`);

		dispatch({ type: actions.FETCH_PROPERTIES_SUCCESS, payload: data.response });
	} catch (error: any) {
		dispatch({
			type: actions.FETCH_PROPERTIES_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const getRoomDetails = (id: IRoom['_id']) => async (dispatch: Dispatch) => {
	try {
		dispatch({ type: actions.ROOM_DETAILS_REQUEST });

		const { data } = await axios.get(`${API_URL}/api/rooms/${id}`);
		dispatch({ type: actions.ROOM_DETAILS_SUCCESS, payload: data });
	} catch (error: any) {
		dispatch({
			type: actions.ROOM_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

import * as actions from '../constants/RoomConstants';
import { AnyAction } from 'redux'
import { IRoom,IProperty } from '../../interfaces/Room.interface';

const initialState: { rooms: IRoom[] } = {
    rooms: [],
};

const propertyState: { properties: IProperty[] } = {
    properties: [],
};

export const roomsFetchReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case actions.FETCH_ROOMS_REQUEST:
            return {
                loading: true
            };
        case actions.FETCH_ROOMS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload,
                count: action.payload.count
            };
        case actions.FETCH_ROOMS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const propertiesFetchReducer = (state = propertyState, action: AnyAction) => {
    switch (action.type) {
        case actions.FETCH_PROPERTIES_REQUEST:
            return {
                loading: true
            };
        case actions.FETCH_PROPERTIES_SUCCESS:
            return {
                loading: false,
                properties: action.payload,
                count: action.payload.count
            };
        case actions.FETCH_PROPERTIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const roomDetailsReducer = (state = { room: {} }, action: AnyAction) => {
    switch (action.type) {
        case actions.ROOM_DETAILS_REQUEST:
            return {
                loading: true
            };
        case actions.ROOM_DETAILS_SUCCESS:
            return {
                loading: false,
                room: action.payload
            };
        case actions.ROOM_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
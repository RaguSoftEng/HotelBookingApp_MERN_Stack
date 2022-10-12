import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { usersFetchReducer, userDetailsReducer, userLoginReducer, userRegisterReducer } from './reducers/UserReducers';
import { roomsFetchReducer, roomDetailsReducer, propertiesFetchReducer } from './reducers/RoomReducers';
import { bookingsFetchReducer, bookingDeleteReducer, roomBookingCheckReducer, bookingCreateReducer, bookedDatesReducer, BookingsMyReducer } from './reducers/BookingReducers';

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducers = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	usersFetch: usersFetchReducer,
	userDetails: userDetailsReducer,
	roomsFetch: roomsFetchReducer,
	propertiesFetch: propertiesFetchReducer,
	roomDetails: roomDetailsReducer,
	roomBookingCheck: roomBookingCheckReducer,
	bookingsFetch: bookingsFetchReducer,
	bookingDelete: bookingDeleteReducer,
	bookedDates: bookedDatesReducer,
	bookingCreate: bookingCreateReducer,
	BookingsMy: BookingsMyReducer
});

const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')!);

const initialState = {
	userLogin: {
		userInfo: userInfoFromStorage
	}
};

const store = createStore(rootReducers, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

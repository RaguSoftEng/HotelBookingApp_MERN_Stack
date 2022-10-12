import React, { useState, useEffect, Dispatch } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RoomCard from '../components/RoomCard';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { IProperty, IRoom } from '../interfaces/Room.interface';
import SearchRooms from '../components/SearchRooms';
import { fetchRooms } from '../redux/actions/room.actions';
import store from '../redux/store';

const Home = () => {
	const dispatch = store.dispatch as typeof store.dispatch | Dispatch<any>;

	const [property, setProperty] = useState<string>('');
	const [dateFrom, setDateFrom] = useState<string>('');
	const [dateTo, setDateTo] = useState<string>('');

	const { loading, rooms, count, error } = useSelector((state: any) => state.roomsFetch);

	useEffect(() => {
		dispatch(fetchRooms(property, dateFrom, dateTo));
	}, [dispatch, property, dateFrom, dateTo]);

	return (
		<Container>
			<Row>
				<Col>
					<h2 className="mb-4">All Rooms</h2>
				</Col>
			</Row>
			<SearchRooms property={property} setProperty={setProperty} dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} />
			<Row>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : rooms.length > 0 ? (
					<>
						{rooms.map((room: IRoom) => (
							<Col key={room._id} md={4} sm={6} xs={12}>
								<RoomCard {...room} />
							</Col>
						))}
					</>
				) : (
					<>
						<Message variant="info">No Room Available</Message>
					</>
				)}
			</Row>
		</Container>
	);
};

export default Home;

import React, { Dispatch, useEffect } from 'react';
import { Col, Form, FormGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IProperty } from '../interfaces/Room.interface';
import { fetchProperties } from '../redux/actions/room.actions';
import store from '../redux/store';
import Loader from './Loader';
import Message from './Message';

type SearchRoomsParams = {
	property: string;
	setProperty: React.Dispatch<React.SetStateAction<string>>;
	dateFrom: string;
	setDateFrom: React.Dispatch<React.SetStateAction<string>>;
	dateTo: string;
	setDateTo: React.Dispatch<React.SetStateAction<string>>;
};

const SearchRooms = ({ property, setProperty, dateFrom, setDateFrom, dateTo, setDateTo }: SearchRoomsParams) => {
	const dispatch = store.dispatch as typeof store.dispatch | Dispatch<any>;

	const { loading, properties, count, error } = useSelector((state: any) => state.propertiesFetch);

	useEffect(() => {
		dispatch(fetchProperties());
	}, [dispatch]);

	return (
		<Form className="mb-4">
			<Row>
				<Col md={4}>
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant="danger">{error}</Message>
					) : properties.length > 0 ? (
						<>
							<FormGroup controlId="Property">
								<Form.Label>Location</Form.Label>
								<Form.Select name="Property" value={property} onChange={(e) => setProperty(e.target.value)} aria-label="Default select example">
									{properties.map((property: IProperty) => (
										<option value={property._id} key={property._id}>
											{property.name}
										</option>
									))}
								</Form.Select>
							</FormGroup>
						</>
					) : (
						<>
							<Message variant="info">No Room Available</Message>
						</>
					)}
				</Col>
				<Col md={4}>
					<FormGroup controlId="dateFrom">
						<Form.Label>From</Form.Label>
						<Form.Control type="date" name="dateFrom" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}></Form.Control>
					</FormGroup>
				</Col>
				<Col md={4}>
					<FormGroup controlId="dateTo">
						<Form.Label>To</Form.Label>
						<Form.Control type="date" name="dateTo" value={dateTo} onChange={(e) => setDateTo(e.target.value)}></Form.Control>
					</FormGroup>
				</Col>
			</Row>
		</Form>
	);
};

export default SearchRooms;

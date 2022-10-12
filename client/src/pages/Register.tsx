import React, { useState, useEffect, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { register } from '../redux/actions/user.action';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { IUser } from '../interfaces/User.interface';
import store from '../redux/store';

const Register = () => {
	const dispatch = store.dispatch as typeof store.dispatch | Dispatch<any>;
	let navigate = useNavigate();

	const [fullname, setFullname] = useState<IUser['fullname']>('');
	const [email, setEmail] = useState<IUser['email']>('');
	const [password, setPassword] = useState<IUser['password']>('');
	const [contactNo, setContactNo] = useState<IUser['contactNo']>('');

	const { loading, success, error } = useSelector((state: any) => state.userRegister);
	const { userInfo } = useSelector((state: any) => state.userLogin);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(register({ fullname, email, password, contactNo }));
	};

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [dispatch, userInfo, success]);

	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<h2 className="mb-4">Sign up</h2>
					{error && <Message variant="danger">{error}</Message>}
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="name" className="mb-3">
							<Form.Label>Full Name</Form.Label>
							<Form.Control type="text" value={fullname} placeholder="Full Name" onChange={(e) => setFullname(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="email" className="mb-3">
							<Form.Label>E-Mail</Form.Label>
							<Form.Control type="email" value={email} placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="contactNo" className="mb-3">
							<Form.Label>Contact No</Form.Label>
							<Form.Control type="text" value={contactNo} placeholder="Contact No" onChange={(e) => setContactNo(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="password" className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Button variant="primary" type="submit">
								{loading ? <Loader /> : `Register`}
							</Button>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Register;

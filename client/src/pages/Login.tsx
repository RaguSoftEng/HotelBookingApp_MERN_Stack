import React, { Dispatch, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUser } from '../interfaces/User.interface';
import { login } from '../redux/actions/user.action';
import Loader from '../components/Loader';
import store from '../redux/store';

type LoginProps = {};

const Login = (props: LoginProps) => {
	let navigate = useNavigate();
	const dispatch = store.dispatch as typeof store.dispatch | Dispatch<any>;

	const [email, setEmail] = useState<IUser['email']>('');
	const [password, setPassword] = useState<IUser['password']>('');

	const { userInfo, loading, error, success } = useSelector((state: any) => state.userLogin);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	useEffect(() => {
		if (success || userInfo) {
			navigate('/');
		}
	}, [userInfo, success, dispatch]);

	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<h2 className="mb-4">Login</h2>
					{error && <Message variant="danger">{error}</Message>}
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="email" className="mb-3">
							<Form.Label>E-Mail</Form.Label>
							<Form.Control type="email" value={email} placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="password" className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Button variant="primary" type="submit">
								{loading ? <Loader /> : `Login`}
							</Button>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;

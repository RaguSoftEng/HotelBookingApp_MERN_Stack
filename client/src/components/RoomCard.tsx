import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { IRoom } from '../interfaces/Room.interface';


const RoomCard= (props: IRoom) => {

  const { _id, property , roomNo } = props;

  return (
    <Card className="card-room">
        <Card.Img variant="top" src={`/src/assets/icons/room.jpg`} />
        <Card.Body>
            <Link to={`/rooms/${_id}`}>
              <Card.Title as="h4">{property.name} {roomNo}</Card.Title>
            </Link>
            {
              property.rates.map((rate)=>{
                return <Card.Text as="h5" className="mt-2 mb-2" >{rate.occupancy} | {rate.reservationType} | ${rate.amount}</Card.Text>
              })
            }
            <LinkContainer to={`/rooms/${_id}`}>
              <Button className="w-100" variant="primary">View Details</Button>
            </LinkContainer>
        </Card.Body>
    </Card>
  );
};

export default RoomCard;

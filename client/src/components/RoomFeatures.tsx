import { ListGroup } from "react-bootstrap";

type RoomFeaturesProps = {
  seaView: boolean;
  lakeView: boolean;
  mountainView: boolean;
  Wifi: boolean;
  bathtub: boolean;
  balcony: boolean;
  floorArea: string;
};

const RoomFeatures = (room: RoomFeaturesProps) => {
  return (
    <>
      <h4 className="mt-3 mb-4">Features:</h4>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <i className="bi bi-people-fill"></i>
          {room.floorArea} m2
        </ListGroup.Item>
        {room.seaView && (
          <ListGroup.Item>
            <i className="bi bi-check"></i> Sea View
          </ListGroup.Item>
        )}
        {room.lakeView && (
          <ListGroup.Item>
            <i className="bi bi-check"></i> Lake View
          </ListGroup.Item>
        )}
        {room.mountainView && (
          <ListGroup.Item>
            <i className="bi bi-check"></i> Mountain View
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          {room.Wifi ? (
            <i className="bi bi-check"></i>
          ) : (
            <i className="bi bi-x"></i>
          )}
          Wifi
        </ListGroup.Item>
        <ListGroup.Item>
          {room.bathtub ? (
            <i className="bi bi-check"></i>
          ) : (
            <i className="bi bi-x"></i>
          )}
          Bathtub
        </ListGroup.Item>
        <ListGroup.Item>
          {room.balcony ? (
            <i className="bi bi-check"></i>
          ) : (
            <i className="bi bi-x"></i>
          )}
          balcony
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default RoomFeatures;

import { Alert } from "react-bootstrap";

type messageProps = {
  variant: string;
  children: any;
};

const Message = ({ variant, children }: messageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;

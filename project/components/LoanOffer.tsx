import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import ResultModal from "./ResultModal";
import DeclineModal from "./ResultModal";

interface LoanOfferProps {
  amount: string;
  term: string;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
}

const LoanOffer = ({ amount, term, setIsModalShown }: LoanOfferProps) => {
  const [isDeclined, setIsDeclined] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [message, setMessage] = useState({
    decline: "Sorry to hear that",
    accept: `Your funds are on the way! The loan term is ${term} months.`,
  });
  const handleAcceptedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAccepted(true);
    setIsDeclined(false);
  };
  const handleDeclinedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAccepted(false);
    setIsDeclined(true);
  };
  return (
    <ModalContainer>
      <h1>Congratulations!</h1>
      <p>You have been approved for a ${amount} loan!</p>
      <AcceptButton onClick={handleAcceptedClick}>Accept</AcceptButton>
      <DeclineButton onClick={handleDeclinedClick}>Decline</DeclineButton>
      <BackButton onClick={() => setIsModalShown(false)}>Back</BackButton>
      {isDeclined ? <ResultModal text={message.decline} /> : null}
      {isAccepted ? <ResultModal text={message.accept} /> : null}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  height: 500px;
  width: 800px;
  background-color: #004582eb;
  backdrop-filter: blur(10px);
  z-index: 999;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
`;
const Button = styled.button`
  height: 40px;
  width: 120px;
  border-radius: 50px;
  border: none;
  transition: all 0.3s;
  margin: 10px 5px;
  :hover {
    cursor: pointer;
  }
`;
const AcceptButton = styled(Button)`
  background-color: green;
  :hover {
    background-color: #2e792e;
  }
`;
const DeclineButton = styled(Button)`
  background-color: #970000;
  :hover {
    background-color: #963d3d;
  }
`;
const BackButton = styled(Button)`
  background-color: #467dfc;
  :hover {
    background-color: #769efcb4;
    cursor: pointer;
  }
`;
export default LoanOffer;

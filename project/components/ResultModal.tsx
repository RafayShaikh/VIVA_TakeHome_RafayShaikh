import styled from "styled-components";

const ResultModal = ({ text }: { text: string }) => (
  <Container>
    <p>{text}</p>
  </Container>
);

const Container = styled.div`
  position: absolute;
  height: 500px;
  width: 800px;
  background-color: #004582eb;
  backdrop-filter: blur(10px);
  z-index: 99;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
`;
export default ResultModal;

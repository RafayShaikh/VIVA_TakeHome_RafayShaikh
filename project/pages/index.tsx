import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";

const Home: NextPage = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/personalInformation");
  };

  return (
    <div>
      <Head>
        <title>VIVA Front-End Take Home Challenge</title>
        <meta name="description" content="VIVA Front-End Take Home Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WelcomeScreen>
        <HeadText>Hello</HeadText>
        <ParagraphText>
          {/* eslint-disable-next-line react/no-unescaped-entities*/}
          Welcome to Rafay Shaikh's VIVA take-home project
        </ParagraphText>
        <GetStartedButton onClick={handleClick}>Get Started</GetStartedButton>
      </WelcomeScreen>
    </div>
  );
};

const WelcomeScreen = styled.div`
  width: 100wv;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const HeadText = styled.h1`
  font-size: 50px;
`;
const ParagraphText = styled.p`
  font-size: 30px;
`;
const GetStartedButton = styled.button`
  height: 40px;
  width: 120px;
  border-radius: 50px;
  background-color: #2363f8;
  border: none;
  transition: all 0.3s;
  :hover {
    background-color: #2664f7dc;
    cursor: pointer;
  }
`;
export default Home;

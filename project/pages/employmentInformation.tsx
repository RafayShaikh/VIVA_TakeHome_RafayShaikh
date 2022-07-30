import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import LoanOffer from "../components/LoanOffer";

const loanAmount = {
  small: { amount: "500", term: "5" },
  large: { amount: "10,000", term: "24" },
};

const EmploymentInformation: NextPage = () => {
  const router = useRouter();
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <div>
      <Head>
        <title>Employment Information</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper>
        <HeadText>Employment Information</HeadText>
        <EmploymentInformationForm>
          <SectionWrapper>
            <TextLabel htmlFor="employerName">Employer Name</TextLabel>
            <StyledInput
              placeholder="Please Enter Your Employer Name"
              id="employerName"
            ></StyledInput>
          </SectionWrapper>
          <SectionWrapper>
            <TextLabel htmlFor="grossSalary">Gross Salary</TextLabel>
            <StyledInput
              placeholder="Please Enter Your Gross Salary"
              id="grossSalary"
            ></StyledInput>
          </SectionWrapper>
          <SectionWrapper>
            <TextLabel htmlFor="workStatus">Work Status</TextLabel>
            <StyledInput
              placeholder="Please Enter Your Work Status"
              id="workStatus"
            ></StyledInput>
          </SectionWrapper>
          <NextButton onClick={() => setIsModalShown(true)}>Next</NextButton>
          <BackButton onClick={() => router.back()} type="submit">
            Back
          </BackButton>
        </EmploymentInformationForm>
        {isModalShown ? (
          <LoanOffer
            setIsModalShown={setIsModalShown}
            amount={loanAmount.large.amount}
            term={loanAmount.large.term}
          />
        ) : null}
      </ContentWrapper>
    </div>
  );
};

const ContentWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const HeadText = styled.h1`
  font-size: 60px;
`;
const EmploymentInformationForm = styled.div`
  width: 400px;
  border-radius: 10px;
  background-color: #ffdab916;
  padding: 10px 20px;
`;
const TextLabel = styled.label`
  font-size: 15px;
  margin: 5px 0px;
`;
const StyledInput = styled.input<{ error?: boolean }>`
  padding: 5px;
  height: 35px;
  border-radius: 10px;
  border: ${(props) => (props.error ? "1px solid red" : "none")};
`;
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 20px 0px;
`;
const NextButton = styled.button`
  height: 40px;
  width: 120px;
  border-radius: 50px;
  background-color: #2363f8;
  border: none;
  transition: all 0.3s;
  margin: 5px;
  :hover {
    background-color: #2664f7dc;
    cursor: pointer;
  }
`;
const BackButton = styled(NextButton)`
  background-color: #467dfc;
  :hover {
    background-color: #5387ffb4;
    cursor: pointer;
  }
`;

export default EmploymentInformation;

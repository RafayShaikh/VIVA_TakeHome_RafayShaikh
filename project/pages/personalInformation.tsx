import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AppContext from "../AppContext";

const PersonalInformation: NextPage = () => {
  const values = useContext(AppContext);
  const router = useRouter();
  const [errors, setErrors] = useState({
    dob: "",
    firstName: "",
    lastName: "",
    ssn: "",
  });
  const [isNextAvailable, setIsNextAvailable] = useState(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      (e.target.id === "firstName" || e.target.id === "lastName") &&
      e.target.value === ""
    ) {
      setErrorsFunction(e, "This field is required");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(e);
    if (e.target.id === "firstName" || e.target.id === "lastName") {
      setFirstLastNames(e);
    }
    if (e.target.id === "dob" && e.target.type === "date" && e.target.value) {
      setDOB(e);
    }
    if (e.target.id === "ssn") {
      setSSN(e);
    }
  };
  const handleNext = (e: any) => {
    let inputObj = values.inputValues;
    if (
      inputObj.firstName !== "" &&
      inputObj.lastName !== "" &&
      inputObj.dob !== "" &&
      inputObj.ssn !== "" &&
      errors.firstName === "" &&
      errors.lastName === "" &&
      errors.dob === "" &&
      errors.ssn === ""
    ) {
      setIsNextAvailable(true);
      router.push("/employmentInformation");
    } else {
      setIsNextAvailable(false);
      alert("Please completely fill-out the form.");
    }
  };
  const setErrorsFunction = (e: any, message?: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [e.target.id]: message || "Please enter a valid value",
    }));
  };
  const clearErrors = (e: any) => {
    setErrors((prev: any) => ({
      ...prev,
      [e.target.id]: "",
    }));
  };
  function calculateAge(birthday: string) {
    let dob = new Date(birthday);
    let ageDifMs = Date.now() - dob.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const setFirstLastNames = (e: any) => {
    values?.setInputValues((prev: any) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const setDOB = (e: any) => {
    let age = calculateAge(e.target.value);
    if (age >= 18 && age <= 125) {
      clearErrors(e);
      values?.setInputValues((prev: any) => ({
        ...prev,
        [e.target.id]: e.target.value,
        age: age,
      }));
    } else {
      setErrorsFunction(e, "Age must be above 18 and below 125");
    }
  };
  const setSSN = (e: any) => {
    clearErrors(e);
    let value = e.target.value.replace(/-/g, "");

    if (value.length !== 9 || !isValidSSN(value)) {
      setErrorsFunction(e, "Please enter a valid SSN XXX-XX-XXXX");
    }
    values?.setInputValues((prev: any) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    e.target.value = e.target.value.replace(
      /(\d{3})(\d{2})(\d{4})/,
      "$1-$2-$3"
    );
  };
  const isValidSSN = (val: string) => {
    return !val.match("111111111") && !isNaN(+val);
    //We can always add more here
  };
  useEffect(() => {
    if (
      errors.firstName === "" &&
      errors.lastName === "" &&
      errors.ssn === "" &&
      errors.dob === ""
    ) {
      setIsNextAvailable(true);
    }
  }, [errors.firstName, errors.lastName, errors.ssn, errors.dob]);
  return (
    <div>
      <Head>
        <title>Personal Information</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper>
        <HeadText>Personal Information</HeadText>
        <PersonalInformationForm>
          <SectionWrapper>
            <TextLabel htmlFor="firstName">First Name</TextLabel>
            <StyledInput
              placeholder="Please Enter Your First Name"
              id="firstName"
              value={values.inputValues.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.firstName !== ""}
            ></StyledInput>
            <ErrorText>
              {errors.firstName !== "" ? errors.firstName : null}
            </ErrorText>
          </SectionWrapper>
          <SectionWrapper>
            <TextLabel htmlFor="lastName">Last Name</TextLabel>
            <StyledInput
              placeholder="Please Enter Your Last Name"
              id="lastName"
              value={values.inputValues.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.lastName !== ""}
            ></StyledInput>
            <ErrorText>
              {errors.lastName !== "" ? errors.lastName : null}
            </ErrorText>
          </SectionWrapper>
          <SectionWrapper>
            <TextLabel htmlFor="dob">Date of Birth</TextLabel>
            <StyledInput
              type="date"
              id="dob"
              value={values.inputValues.dob}
              onChange={handleChange}
              error={errors.dob !== ""}
            ></StyledInput>
            <ErrorText>{errors.dob !== "" ? errors.dob : null}</ErrorText>
          </SectionWrapper>
          <SectionWrapper>
            <TextLabel htmlFor="ssn">Social Security Number</TextLabel>
            <StyledInput
              placeholder="Please Enter Your SSN"
              type="text"
              id="ssn"
              value={values.inputValues.ssn}
              onChange={handleChange}
              error={errors.ssn !== ""}
            ></StyledInput>
            <ErrorText>{errors.ssn !== "" ? errors.ssn : null}</ErrorText>
          </SectionWrapper>
          <NextButton disabled={!isNextAvailable} onClick={handleNext}>
            Next
          </NextButton>
        </PersonalInformationForm>
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
const PersonalInformationForm = styled.div`
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
  :hover {
    background-color: #2664f7dc;
    cursor: pointer;
  }
`;

const ErrorText = styled(TextLabel)`
  color: red;
`;
export default PersonalInformation;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContext from "../AppContext";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    age: 0,
    ssn: "",
    employerName: "",
    grossSalary: 0,
    workStatus: "",
  });

  return (
    <AppContext.Provider value={{ inputValues, setInputValues }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;

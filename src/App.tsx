
import { useMultistepForm } from "./useMultistepForm";
import { AddressForm } from "./AddressForm";
import { AccountForm } from "./AccountForm";
import { UserForm } from "./UserForm"
import "./style.css"
import { FormEvent, useState, useEffect } from "react";

type FormData = {
  firstName: string,
  lastName: string,
  age: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  email: string,
  password: string,
}

const INITIAL_DATA : FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}




const App = () => {

  const [data, setData] = useState(INITIAL_DATA);

  const [isStepValid, setIsStepValid] = useState(false);
  function updateFields(fields: Partial <FormData>) {
    // get preveious data from the last render 
    setData(prev => {
      return {...prev, ...fields}
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
    <UserForm {...data} updateFields={updateFields} />, 
    <AccountForm {...data} updateFields={updateFields} />, 
    <AddressForm {...data} updateFields={updateFields} />
  ]);

    function onSubmit(e: FormEvent) {
      e.preventDefault()
      if (!isLastStep) return next()
      alert("Successful Account Creation")
    }

    function validateStep() {
      switch (currentStepIndex) {
        case 0:
          // Validate UserForm (example validation)
          setIsStepValid(
            data.firstName.trim() !== "" &&
              data.lastName.trim() !== "" &&
              data.age.trim() !== ""
          );
          break;
        case 1:
          // Validate AccountForm
          setIsStepValid(
            data.email.trim() !== "" && data.password.trim().length >= 6
          );
          break;
        case 2:
          // Validate AddressForm
          setIsStepValid(
            data.street.trim() !== "" &&
              data.city.trim() !== "" &&
              data.state.trim() !== "" &&
              data.zip.trim() !== ""
          );
          break;
        default:
          setIsStepValid(false);
      }
    }
  
    useEffect(() => {
      validateStep();
    }, [data, currentStepIndex]);

   // Attach Event Listener for Arrow Key Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && isStepValid && !isLastStep) {
        next();
      } else if (e.key === "ArrowLeft" && !isFirstStep) {
        back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFirstStep, isLastStep, isStepValid, next, back]);

  return (
    <div style={{
      display: "flex",
      alignItems:"center",
      paddingTop:"6rem",
      justifyContent:"center"
    }}>
    <div
      style={{
        position: "relative",
        background: "white",
        // border: "1px solid black",
        boxShadow: "4px 4px 15px rgba(0,0,0,0.4)",
        paddingTop:"4rem",
        padding: "2.9rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth:"max-content"
      }}
    >
      <form onSubmit={onSubmit}>
        <div
          style={{
            position: "absolute",
            top: ".5rem",
            right: ".5rem",
          }}
        >
          {currentStepIndex + 1} / {steps.length}
        </div>

        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit" disabled={!isStepValid} >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default App;

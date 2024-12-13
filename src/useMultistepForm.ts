import { ReactElement, useState } from "react";

// This custom hook will manage all the states
export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1 ) {
        return i
      } else {
        return i + 1
      }
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
        if (i <= 0 ) {
          return i
        } else {
          return i - 1
        }
      });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    goTo,
    next, 
    back,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}

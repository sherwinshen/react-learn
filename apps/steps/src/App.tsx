import { useState } from "react";
import Button from "./components/Button";
import StepMessage from "./components/StepMessage";

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

  const handlePrevious = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };
  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  };

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button onClick={() => console.log(`Learn how to ${messages[step - 1]}`)}> Learn how </Button>
            </div>
          </StepMessage>
          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious} previous={<span>👈</span>}>
              <span>Previous</span>
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              <span>Next</span>
              <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

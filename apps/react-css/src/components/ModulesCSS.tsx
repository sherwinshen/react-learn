import { useState } from "react";
import classes from "../styles/example.module.css";

function ModulesCSS() {
  const [isHighlighted, setIsHighlighted] = useState(false);

  console.log(classes);
  return (
    <>
      <div className={`${classes.red} ${isHighlighted ? classes["font-bold"] : ""}`}>
        Hello! <span className={classes.blue}>Welcome to my world!</span>
      </div>
      <button onClick={() => setIsHighlighted(!isHighlighted)}>click</button>
    </>
  );
}

export default ModulesCSS;

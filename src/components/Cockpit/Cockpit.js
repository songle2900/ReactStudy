import React, { useEffect } from "react";
import classes from "./Cockpit.css";

const cockpit = ( props ) => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    setTimeout(() => {
      alert('Saved data to cloud!');
    }, 1000);
    
    // cleanup
    // It runs BEFORE the main useEffect function runs, but AFTER the (first) render cycle
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect')
    };
  }, []);

  // Can use more than one useEffect()
  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');

    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect')
    };
  });

  const assignedClasses = [];
  let btnClass = "";
  let btnClass2 = "";

  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }

  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <div>Title: </div>
    </div>
  );
};

export default React.memo(cockpit);
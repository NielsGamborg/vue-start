/**
 * Just a template to demonstrate that:
 * 
 * 1) File imports are working
 * 2) ES6 is working
 * 3) The compiled file can be imported from index.html
 * 
 * Open index.html to view it. And just delete everything when you want to. 
 */

// Importér vores stylesheet
import styles from "./styles.less";

import { makeGreeting } from "./greeting";

const nameInput = document.querySelector("#nameinput");
const outputButton = document.querySelector("#greeting");

// Recalculate the greeting on every button input

nameInput.addEventListener("input", event => {
  outputButton.innerHTML = makeGreeting(event.target.value);
});

// Trigger an input event to render the greeting from the start

nameInput.dispatchEvent(
  new Event("input", {
    bubbles: true,
    cancelable: true
  })
);

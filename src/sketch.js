import { UserInterface } from './modules/userinterface.js';
// import { StrudelDrums } from './modules/strudeldrums.js';

import { Tone } from '@strudel.cycles/tone';

// variables for user interface
let userInterface;
let strudelDrums;

function init() {
  userInterface = new UserInterface(true);
  userInterface.init();
  // strudelDrums = new StrudelDrums();
  // strudelDrums.init();
}

init();

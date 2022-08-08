import { UserInterface } from './modules/userinterface.js';
import { StrudelDrums } from './modules/strudeldrums.js';
import {
  sequence,
  stack,
  State,
  TimeSpan,
} from '@strudel.cycles/core';

import {
  Tone,
  MembraneSynth,
  NoiseSynth,
} from '@strudel.cycles/tone';

// variables for user interface
let userInterface;

function init() {
  userInterface = new UserInterface(true);
  userInterface.init();
}

init();

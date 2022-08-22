// references
// https://github.com/tidalcycles/strudel/tree/main/packages/tone
// https://strudel.tidalcycles.org/tutorial/

// import { UserInterface } from './modules/userinterface.js';
// import { Tone } from '@strudel.cycles/tone';

// variables for user interface
// let userInterface;

// matthew recommends implementing this:
// https://github.com/tidalcycles/strudel/blob/main/packages/react/src/hooks/useCycle.mjs#L27-L58
// paired with another function that keeps on calling that one

import {
  sequence,
  stack,
  State,
  TimeSpan,
} from '@strudel.cycles/core';

import {
  Tone,
  polysynth,
  osc,
  out,
  membrane,
} from '@strudel.cycles/tone';
import { MembraneSynth } from 'tone';

const pattern = sequence('c3', ['eb3', stack('g3', 'bb3')]).tone(
  polysynth().set(osc('sawtooth4')).chain(out()),
);

const drums = sequence('c2', 'c2').tone(membrane().chain(out()));

document
  .getElementById('buttonStartStop')
  .addEventListener('click', async () => {
    await Tone.start();
    Tone.getTransport().stop();

    // const events = pattern
    //   .query(new State(new TimeSpan(0, 4)))
    //   .filter((e) => e.whole.begin.equals(e.part.begin));

    // const events = drums
    // .query(new State(new TimeSpan(0, 4)))
    //   .filter((e) => e.whole.begin.equals(e.part.begin));

    const events = drums
      .query(new State(new TimeSpan(0, 1)))
      .filter((e) => e.whole.begin.equals(e.part.begin));

    events.forEach((event) =>
      Tone.getTransport().schedule(
        (time) => event.context.onTrigger(time, event),
        event.whole.begin.valueOf(),
      ),
    );
    Tone.getTransport().start('+0.1');
  });

function init() {
  // userInterface = new UserInterface(true);
  // userInterface.init();
}

init();

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

// as of august 23 2022 i am adapting from the
// strudel starter repo at
// https://github.com/felixroos/strudel-starter

// import {
//   sequence,
//   stack,
//   State,
//   TimeSpan,
// } from '@strudel.cycles/core';

// import {
//   Tone,
//   polysynth,
//   osc,
//   out,
//   membrane,
// } from '@strudel.cycles/tone';

// const pattern = sequence('c3', ['eb3', stack('g3', 'bb3')]).tone(
//   polysynth().set(osc('sawtooth4')).chain(out()),
// );

// const drums = sequence('c2', 'c2').tone(membrane().chain(out()));

// document
//   .getElementById('buttonStartStop')
//   .addEventListener('click', async () => {
//     await Tone.start();
//     Tone.getTransport().stop();

//     // const events = pattern
//     //   .query(new State(new TimeSpan(0, 4)))
//     //   .filter((e) => e.whole.begin.equals(e.part.begin));

//     // const events = drums
//     // .query(new State(new TimeSpan(0, 4)))
//     //   .filter((e) => e.whole.begin.equals(e.part.begin));

//     const events = drums
//       .query(new State(new TimeSpan(0, 4)))
//       .filter((e) => e.whole.begin.equals(e.part.begin));

//     events.forEach((event) =>
//       Tone.getTransport().schedule((time) => {
//         event.context.onTrigger(time, event), console.log(time);
//         event.whole.begin.valueOf();
//       }),
//     );
//     Tone.getTransport().start('+0.1');
//   });

// function init() {
//   // userInterface = new UserInterface(true);
//   // userInterface.init();
// }

// init();

// import {
//   sequence,
//   stack,
//   State,
//   TimeSpan,
// } from '@strudel.cycles/core';

// import {
//   Tone,
//   polysynth,
//   osc,
//   out,
//   membrane,
// } from '@strudel.cycles/tone';

import { evaluate, evalScope } from '@strudel.cycles/eval';
import { Scheduler, getAudioContext } from '@strudel.cycles/webaudio';
// import { loadWebDirt } from '@strudel.cycles/webdirt';
import controls from '@strudel.cycles/core/controls.mjs';

// import desired modules and add them to the eval scope
await evalScope(
  import('@strudel.cycles/core'),
  import('@strudel.cycles/mini'),
  import('@strudel.cycles/osc'),
  import('@strudel.cycles/webdirt'),
  import('@strudel.cycles/webaudio'),
  import('@strudel.cycles/tonal'),
  controls,
  // import other strudel packages here
); // add strudel to eval scope

let scheduler;
let initialized = false;

// eval + start on button click
document
  .getElementById('buttonStartStop')
  .addEventListener('click', async () => {
    if (!initialized) {
      const audioContext = getAudioContext();
      const latency = 0.2;

      // // load default samples + init webdirt
      // loadWebDirt({
      //   audioContext,
      //   latency,
      //   sampleMapUrl: 'https://strudel.tidalcycles.org/EmuSP12.json',
      //   sampleFolder: 'https://strudel.tidalcycles.org/EmuSP12/',
      // });

      // the scheduler will query the pattern within the given interval
      scheduler = new Scheduler({
        audioContext,
        interval: 0.1,
        latency,
        onEvent: (hap) => {
          if (!hap.context.onTrigger) {
            console.warn(
              'no output chosen. use one of .out() .webdirt() .osc()',
            );
          }
        },
      });

      initialized = true;
    }

    const { pattern } = await evaluate();
    // 's("bd sd").osc()', // need to run sclang + osc server (npm run osc in strudel root)
    // `stack(
    //   s("bd(3,8),hh*4,~ sd").webdirt(),
    // ).slow(1)`

    //   `samples({
    //   clubkick: 'clubkick/2.wav',
    //   sd: ['808sd/SD0010.WAV','808sd/SD0050.WAV'],
    //   hh: 'hh/000_hh3closedhh.wav',
    //   clak: 'clak/000_clak1.wav',
    //   jvbass: ['jvbass/000_01.wav','jvbass/001_02.wav','jvbass/003_04.wav','jvbass/004_05.wav','jvbass/005_06.wav']
    // }, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');
    // stack(
    //   "<clubkick*2>,[~ <sd!3 sd(3,4,2)>],hh(3,4)".s().n("<0 1 2>").speed(perlin.range(.7,.9)),
    //   "<a1 b1*2 a1(3,8) e2>"
    //   .off(1/8,x=>x.add(12).degradeBy(.5))
    //   .add(perlin.range(0,.5))
    //   .n().decay(.15).sustain(0).s("sawtooth")
    //   .superimpose(x=>x.add(.08)).gain(.4)
    //   .cutoff(sine.slow(7).range(300,5000)),
    //   "<Am7!3 <Em7 E7b13 Em7 Ebm7b5>>".voicings().superimpose(x=>x.add(.04))
    //   .add(perlin.range(0,.5))
    //   .n().s('sawtooth')
    //   .gain(.16)
    //   .cutoff(500)
    //   .attack(1),
    //   "a4 c5 <e6 a6>".struct("x(5,8)")
    //   .superimpose(x=>x.add(.04))
    //   .add(perlin.range(0,.5)).n()
    //   .decay(.1).sustain(0).s('triangle')
    //   .degradeBy(perlin.range(0,.5)).echoWith(4,.125,(x,n)=>x.gain(.15*1/(n+1)))
    // )
    //   .out()
    //   .slow(3/2)`,

    // (drums = sequence('c2', 'c2').tone(membrane().chain(out()))),
    /*     `stack(
      "c3@3 [eb3, g3, [c4 d4]/2]",
      "c2 g2",
      "[eb4@5 [f4 eb4 d4]@3] [eb4 c4]/2".slow(8)
    ).n().s('triangle').out()`, */
    scheduler.setPattern(pattern);
    scheduler.start();
  });

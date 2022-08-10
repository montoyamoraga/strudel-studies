import {
  sequence,
  stack,
  State,
  TimeSpan,
} from '@strudel.cycles/core';

import { Tone, out, vol } from '@strudel.cycles/tone';

import { mini } from '@strudel.cycles/mini';

class StrudelDrums {
  constructor() {
    this.kick = new Tone.MembraneSynth().chain(vol(0.8), out());
    // this.snare = new Tone.NoiseSynth().chain(vol(0.8), out());
    this.drums = stack(
      mini('[c1 c1]').tone(this.kick).bypass('<0@7 1>/8'),
      // mini('~ <x!7 [x@3 x]>').tone(this.snare).bypass('<0@7 1>/4'),
    );
  }
  init() {
    stack(this.drums.fast(2)).slow(2);
  }
}

export { StrudelDrums };

// const kick = new MembraneSynth().chain(vol(0.8), out());
// const snare = new NoiseSynth().chain(vol(0.8), out());
// const hihat = new MetalSynth()
//   .set(adsr(0, 0.08, 0, 0.1))
//   .chain(vol(0.3), out());
// const drums = stack(
//   '[c1 c1]'.tone(kick),
//   // "~ <x!7 [x@3 x]>".tone(snare).bypass("<0@7 1>/4"),
//   // "[~ c4]*2".tone(hihat)
// );
// stack(drums);

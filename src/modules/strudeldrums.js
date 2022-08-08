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
    this.snare = new Tone.NoiseSynth().chain(vol(0.8), out());
    this.drums = stack(
      mini('[c1*2]').tone(this.kick).bypass('<0@7 1>/8'),
      mini('~ <x!7 [x@3 x]>').tone(this.snare).bypass('<0@7 1>/4'),
    );
  }
  init() {
    stack(this.drums.fast(2)).slow(2);
  }
}

export { StrudelDrums };

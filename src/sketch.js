import {
  sequence,
  stack,
  State,
  TimeSpan,
} from '@strudel.cycles/core';
import { Tone, polysynth, osc, out } from '@strudel.cycles/tone';

const pattern = sequence('c3', ['eb3', stack('g3', 'bb3')]).tone(
  polysynth().set(osc('sawtooth4')).chain(out()),
);

document
  .getElementById('play')
  .addEventListener('click', async () => {
    await Tone.start();
    Tone.getTransport().stop();
    const events = pattern
      .query(new State(new TimeSpan(0, 4)))
      .filter((e) => e.whole.begin.equals(e.part.begin));
    events.forEach((event) =>
      Tone.getTransport().schedule(
        (time) => event.context.onTrigger(time, event),
        event.whole.begin.valueOf(),
      ),
    );
    Tone.getTransport().start('+0.1');
  });

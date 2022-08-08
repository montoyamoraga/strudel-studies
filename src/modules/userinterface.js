import { SceneManager } from './scenemanager.js';
import { StrudelDrums } from './strudeldrums.js';
import { Tone, Synth } from '@strudel.cycles/tone';

class UserInterface {
  constructor(newManager) {
    this.newManager = newManager;
    this.buttonStartStop = document.getElementById('buttonStartStop');
    this.strudelDrums = new StrudelDrums();

    if (this.newManager) {
      this.sceneManager = new SceneManager();
    }
  }

  init() {
    // start stop button events
    this.buttonStartStop.addEventListener('click', (event) => {
      console.log('pressed buttonStartStop');
      let currentText = this.buttonStartStop.innerHTML;
      if (currentText === 'start') {
        this.buttonStartStop.innerHTML = 'stop';
      } else {
        this.buttonStartStop.innerHTML = 'start';
      }
    });

    this.buttonStartStop.addEventListener('click', async () => {
      this.strudelDrums.init();
      await Tone.start();
      Tone.getTransport().stop();
      Tone.getTransport().start('+0.1');
    });

    // key events
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Digit1') {
        this.sceneManager.changeScene(1);
      } else if (event.code === 'Digit2') {
        this.sceneManager.changeScene(2);
      } else if (event.code === 'Digit3') {
        this.sceneManager.changeScene(3);
      }
    });
  }
}

export { UserInterface };

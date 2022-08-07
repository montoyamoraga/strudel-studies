import { SceneManager } from './scenemanager.js';

class UserInterface {
  constructor(newManager) {
    this.newManager = newManager;
    this.buttonStartStop = document.getElementById('buttonStartStop');

    if (this.newManager) {
      this.sceneManager = new SceneManager();
    }
  }

  init() {
    this.buttonStartStop.addEventListener('click', (event) => {
      console.log('pressed buttonStartStop');
    });
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

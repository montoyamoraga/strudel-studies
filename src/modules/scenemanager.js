import { _LIVE, _LOGGING } from './globalvariables';

class SceneManager {
  constructor() {
    this.currentScene = 1;
  }
  changeScene(newScene) {
    if (_LOGGING) {
      console.log('currentScene was: ' + this.currentScene);
    }
    this.currentScene = newScene;
    if (_LOGGING) {
      console.log('currentScene is: ' + this.currentScene);
    }
  }
  whichScene() {
    console.log(this.currentScene);
  }
}

export { SceneManager };

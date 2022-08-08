import { _LIVE, _LOGGING } from './globalvariables';

class SceneManager {
  constructor() {
    this.currentScene = 1;
    this.currentSceneText = document.getElementById(
      'currentSceneText',
    );
  }
  changeScene(newScene) {
    if (_LOGGING) {
      console.log('currentScene was: ' + this.currentScene);
    }
    this.currentScene = newScene;
    this.currentSceneText.innerHTML = this.currentScene;
    if (_LOGGING) {
      console.log('currentScene is: ' + this.currentScene);
    }
  }
  whichScene() {
    console.log(this.currentScene);
  }
}

export { SceneManager };

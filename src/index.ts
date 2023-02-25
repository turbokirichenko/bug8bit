import { Manager } from './shared/Manager';
import { LoaderScene } from './scene/LoaderScene';

Manager.init(0xff9900);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

import { Manager } from './Manager';
import { LoaderScene } from './LoaderScene';

Manager.init(640, 480, 0xff9900);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

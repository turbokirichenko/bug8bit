import './style.css'
import { app } from './game'

document.querySelector<HTMLDivElement>('#app')!.appendChild(app.view);

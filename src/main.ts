import { Application } from 'pixi.js';
import HabboLoadingScreen from './HabboLoadingScreen';
import HabboAir from './HabboAir';

// Create a new application
const app = new Application();

// Initialize the application
await app.init({ background: '#1099bb', resizeTo: window });

// Append the application canvas to the document body
document.body.appendChild(app.canvas);

const habbo = new HabboAir();

// const a = new HabboLoadingScreen(600, 400, {});
// a.x = 100;
// a.y = 100;

// app.stage.addChild(a);
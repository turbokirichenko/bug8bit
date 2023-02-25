import { Container } from 'pixi.js';
import { sound } from '@pixi/sound';
import { IScene } from '../shared/Manager';
import { PROB_PI } from '../shared/constant';
import { Vector2d } from '../shared/types';
import { BugUnit } from '../units/BugUnit';
import { Effect } from '../units/Effect';
import { UserScene } from './UserScene';

interface DirectionState {
    startDirection: number,
    nextDirection: number,
    vector: Vector2d,
    position: Vector2d,
}

export class BugScene extends Container implements IScene {
    private _bug: BugUnit;
    public get selfRadius(): number {
        return this._bug.radius;
    }
    private _effect?: Effect;
    private _alive: Boolean = true;
    public get alive() {
        return this._alive;
    }
    private _moving: Boolean = true;
    private _directionState: DirectionState;
    private _speed: number;
    private _radius: number;
    private _delta: Vector2d;
    private _calcSpeed = () => 
        10*(1 + 0.25*Math.random())*Math.log(this._radius)/this._radius;

    constructor(width: number, height: number) {
        super();
        this.interactive = true;

        // set bug textures
        const randNum = Math.random();
        const randIndex = Math.floor(randNum * 3);
        this._bug = new BugUnit(randIndex);
        this.addChild(this._bug);

        //
        const radius = Math.sqrt(width*width/4 + height*height/4);
        const startPoint = randNum * 2 * PROB_PI;
        this._delta = {x: width/2, y: height/2}
        this._radius = radius;
        this._speed = this._calcSpeed();

        this._directionState = this.updateDirectionState(startPoint, this._delta, this._radius);
        this._bug.rotation = this._directionState.nextDirection - Math.PI*1.5;
        this.x = this._directionState.position.x;
        this.y = this._directionState.position.y;

        this.on("pointertap", () => {
            if (!this._moving) return;
            UserScene.increase();
            this._bug.setDestroy();
            this._moving = false;

            // add effect
            this._effect = new Effect("poof");
            if (this.addChild(this._effect)) {
                this._effect.start();
            }

            sound.play('poop-effect');
        });
    }

    update(framesPassed: number):void {
        // update only if alive
        if(!this._moving) {
            this.alpha = (this.alpha <= 0)
                ? 0
                : this.alpha - this._speed/20 * framesPassed;
            if (this.alpha <= 0) this._alive = false;

            return;
        }

        this.x = this.x + this._directionState.vector.x * this._speed * framesPassed;
        this.y = this.y + this._directionState.vector.y * this._speed * framesPassed;

        const posX = this.x - this._delta.x;
        const posY = this.y - this._delta.y;

        // check limit
        if (posX*posX + posY*posY > this._radius * this._radius + 10) {
            const nextPoint = this._directionState.nextDirection;

            //update state
            this._directionState = this.updateDirectionState(nextPoint, this._delta, this._radius);
            this._bug.rotation = this._directionState.nextDirection - Math.PI*1.5;
            this.x = this._directionState.position.x;
            this.y = this._directionState.position.y;

            //update speed
            this._speed = this._calcSpeed();
        }
    }

    resize(width: number, height: number): void {
        console.log('bug:', width, height);
        const radius = Math.sqrt(width*width/4 + height*height/4);
        this._delta = {x: width/2, y: height/2}
        this._radius = radius;
        this._speed = this._calcSpeed();
    }

    public detectCollusion(x: number, y: number, r: number): Boolean {
        const myX = this.x;
        const myY = this.y;
        const myR = this._bug.radius;

        const modX2 = (myX - x)*(myX - x);
        const modY2 = (myY - y)*(myY - y);
        const collusion = modX2 + modY2 < 2*(myR*myR + r*r);
        return collusion;
    }

    public changeDirection() {
        if (!this._moving) return;
        const nextPoint = this._directionState.nextDirection;

        //update state
        this._directionState = this.updateDirectionState(nextPoint, this._delta, this._radius);
        this._bug.rotation = this._directionState.nextDirection - Math.PI*1.5;
    }

    private calcNextPoint(currentPoint: number): number {
        const randRad = (PI:number) => Math.random()*PI/3 - PI/6;
        return currentPoint + PROB_PI + randRad(PROB_PI)
    }

    private getCoordinates(point: number, radius: number):Vector2d {
        const x = Math.cos(point) * radius || 0;
        const y = Math.sin(point) * radius || 0;
        return { x, y }
    }

    private updateDirectionState (startPoint: number, delta: Vector2d, radius: number): DirectionState {
        const nextPoint = this.calcNextPoint(startPoint);
        const startPos: Vector2d = this.getCoordinates(startPoint, radius);
        const nextPos: Vector2d = this.getCoordinates(nextPoint, radius);
        const diffX = (nextPos.x - startPos.x)/100;
        const diffY = (nextPos.y - startPos.y)/100;

        return {
            startDirection: startPoint,
            nextDirection: nextPoint,
            vector: { x: diffX, y: diffY },
            position: { x: startPos.x + delta.x, y: startPos.y + delta.y }
        }
    }
}
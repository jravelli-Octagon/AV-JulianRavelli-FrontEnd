export class Wind {
    speed: number;
    angle: number;
    dir: string;

    constructor(obj) {
		if (obj != null) {
            this.speed = obj.speed;
            this.angle = obj.angle;
            this.dir = obj.dir;
        }
    }
}
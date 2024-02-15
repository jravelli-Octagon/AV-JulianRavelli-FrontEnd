export class Precipitation {
    total: number;
    type: string;

    constructor(obj) {
		if (obj != null) {
            this.total = obj.total;
            this.type = obj.type;
        }
    }
}

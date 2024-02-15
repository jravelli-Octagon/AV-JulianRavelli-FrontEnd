export class Province {
	id: number;
	name: string;

	constructor(obj) {
		if (obj != null) {
			this.id = obj.id;
			this.name = obj.name;
		}
	}
}
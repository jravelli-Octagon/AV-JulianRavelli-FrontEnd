export class Profile {
	id: number;
	name: string;
	isActive: boolean;
	type: string;
	code: string;
	isCashLoadUser: boolean;

	constructor(obj) {
		if (obj != null) {
			this.id = obj.id;
			this.name = obj.name;
			this.isActive = obj.isActive;
			this.type = obj.type;
			this.code = obj.code;
			this.isCashLoadUser = obj.isCashLoadUser;
		}
	}
}

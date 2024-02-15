import { Data } from "./data";

export class Daily {
    data: Array<Data> = new Array<Data>();

    constructor(obj) {
		if (obj != null) {
            if (obj.data != null) {
				obj.data.forEach(d => {
					this.data.push(new Data(d));
				});
			}
        }
    }
}

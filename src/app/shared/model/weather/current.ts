import { Precipitation } from "./precipitation";
import { Wind } from "./wind";

export class Current {
    icon: string;
    icon_num: number;
    summary: string;
    temperature: number;
    wind: Wind;
    precipitation: Precipitation;
    cloud_cover: number;

    constructor(obj) {
		if (obj != null) {
            this.icon = obj.icon;
            this.icon_num = obj.icon_num;
            this.summary = obj.summary;
            this.temperature = obj.temperature;
            this.wind = new Wind(obj.wind);
            this.precipitation = new Precipitation(obj.precipitation);
            this.cloud_cover = obj.cloud_cover;
        }
    }
}

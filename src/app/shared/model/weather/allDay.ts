import { CloudCover } from "./cloudCover";
import { Precipitation } from "./precipitation";
import { Wind } from "./wind";

export class AllDay {
    weather: string;
    icon: number;
    temperature: number;
    temperature_min: number;
    temperature_max: number;
    wind: Wind;
    cloud_cover: CloudCover;
    precipitation: Precipitation;

    constructor(obj) {
		if (obj != null) {
            this.weather = obj.weather;
            this.icon = obj.icon;
            this.temperature = obj.temperature;
            this.temperature_min = obj.temperature_min;
            this.temperature_max = obj.temperature_max;
            this.wind = new Wind(obj.wind);
            this.cloud_cover = new CloudCover(obj.cloud_cover);
            this.precipitation = new Precipitation(obj.precipitation);
        }
    }
}
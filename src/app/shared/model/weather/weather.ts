import { Current } from "./current";
import { Daily } from "./daily";

export class Weather {
    lat: string;
    lon: string;
    elevation: number;
    timezone: string;
    units: string;
    current: Current;
    hourly: any;
    daily: Daily;

	constructor(obj) {
		if (obj != null) {
            this.lat = obj.lat;
            this.lon = obj.lon;
            this.elevation = obj.elevation;
            this.timezone = obj.timezone;
            this.units = obj.units
            this.current = new Current(obj.current);
            this.hourly = obj.hourly;
            this.daily = new Daily(obj.daily);
        }
    }
}
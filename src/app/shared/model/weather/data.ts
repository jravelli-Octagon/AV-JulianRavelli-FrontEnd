import { AllDay } from "./allDay";

export class Data {
    day: Date;
    weather: string;
    icon: number;
    summary: string;
    all_day: AllDay;
    morning: any;
    afternoon: any;
    evening: any;
    temperature: number;

    constructor(obj) {
		if (obj != null) {

            const date = new Date(obj.day); 
            var offset = new Date().getTimezoneOffset() / 60;

            this.day = new Date(date.setHours(new Date(obj.day).getHours() + offset)); // salva el localTime para obtener la fecha real devuelta por la api
            this.weather = obj.weather;
            this.icon = obj.icon;
            this.summary = obj.summary;
            this.all_day = new AllDay(obj.all_day);
            this.morning = obj.morning;
            this.afternoon = obj.afternoon;
            this.evening = obj.evening;
            this.temperature = obj.temperature;
        }
    }
}

import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Weather } from 'src/app/shared/model/weather/weather';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  searchForm: FormGroup;
  searching = false;
  submittedSearch = false;
  warningSearch: string = undefined;
  weather = new Weather(null);
  selectedCountry: any = undefined;
  weatherCity = 'buenos-aires';

  countries = [
	{name: 'Argentina', cities: [
		{name: 'Buenos Aires', value: 'buenos-aires'},
		{name: 'Córdoba', value: 'cordoba'},
		{name: 'Entre Ríos', value: 'entre-rios-province'},
	]},
	{name: 'Uruguay', cities: [
		{name: 'Montevideo', value: 'montevideo'},
		{name: 'Colonia', value: 'colonia-del-sacramento'},
	]},
	{name: 'Chile', cities: [
		{name: 'Santiago', value: 'santiago'},
		{name: 'Talca', value: 'talca'}
	]},
  ];

  constructor(private formBuilder: FormBuilder, private weatherService: WeatherService) { }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
       	province: ['', [Validators.required]]
	});
	// this.search();

  }

  get s() { return this.searchForm.controls; }

  search() {
	this.submittedSearch = true;
		this.searching = true;
		if (this.searchForm.invalid) {
			this.searching = false;
			return;
		}
		this.searching = true;
		this.warningSearch = undefined;

		this.weatherService.getWeatherBy(this.searchForm.value).subscribe(
			(data) => {
				this.weatherCity = this.searchForm.value.province;
				this.weather = new Weather(null);
				this.weather = new Weather(data.responseData);

				if (this.weather.lat === undefined) {
					this.warningSearch = 'No matching results were found.';
				}
			}
		).add(() => {
      this.submittedSearch = false;
      this.searching = false;
		});
	}

	countryChange(value) {
		const selectedCountry = value;
	}

	getCountry() {
		const country = this.countries.find(x => x.cities.some(c => c.value === this.weatherCity));
		return country.name;
	}
	getCity() {
		const country = this.countries.find(x => x.cities.some(c => c.value === this.weatherCity));
		const city = country.cities.find(x => x.value === this.weatherCity);
		return city.name;
	}

}

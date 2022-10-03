import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  private baseUrl: any;

  constructor(private apiService: ApiService,
      @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

  }

  ngOnInit(){
    this.apiService.getWeather(this.baseUrl)
    .subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

}

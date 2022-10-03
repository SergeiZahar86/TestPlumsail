import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }

  /** Получение всех пользователей (фейковых) */
  getWeather(baseUrl: string) {
    return this.httpClient.get<WeatherForecast[]>(baseUrl + 'weatherforecast/getweather');
  }

  getFile() {
    return this.httpClient.get("https://localhost:7031/htmlconversion/getfile",
        { responseType: 'blob'});
  }
}

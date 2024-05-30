import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

type AreaMetadata = {
  name: string;
  label_location: {
    latitude: number;
    longitude: number;
  };
};

type Forecast = {
  area: string;
  forecast: string;
};

type WeatherInfo = {
  update_timestamp: string;
  timestamp: string;
  valid_period: {
    start: string;
    end: string;
  };
  forecasts: Forecast[];
};

type WeatherResponse = {
  area_metadata: AreaMetadata[];
  items: WeatherInfo[];
  api_info: {
    status: string;
  };
};

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(dateTime: string, date: string): Promise<WeatherResponse> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<WeatherResponse>(
          'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast',
          {
            params: { date_time: dateTime, date },
          },
        )
        .pipe(
          catchError((err) => {
            console.log({ err });
            throw 'An error happened';
          }),
        ),
    );
    return data;
  }
}

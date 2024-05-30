import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TrafficService } from './traffic.service';
import { WeatherService } from './weather.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly trafficService: TrafficService,
    private readonly weatherService: WeatherService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/traffic')
  async getTrafficInfo(
    @Query('dateTime') dateTime: string,
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    let result = await this.trafficService.getTraffic(dateTime);
    if (lat && lng) {
      result = {
        ...result,
        items: result.items.map((item) => ({
          ...item,
          cameras: item.cameras.filter(
            (item) =>
              item.location.latitude.toFixed(8) === lat &&
              item.location.longitude.toFixed(6) === lng,
          ),
        })),
      };
    }
    return {
      result,
    };
  }

  @Get('/weather')
  async getWeatherInfo(
    @Query('dateTime') dateTime: string,
    @Query('date') date: string,
  ) {
    return this.weatherService.getWeather(dateTime, date);
  }
}

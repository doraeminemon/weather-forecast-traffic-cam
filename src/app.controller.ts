import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TrafficService } from './traffic.service';
import { WeatherService } from './weather.service';
import { LocationsService } from './locations/locations.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly trafficService: TrafficService,
    private readonly weatherService: WeatherService,
    private readonly locationService: LocationsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/traffic')
  async getTrafficInfo(
    @Query('dateTime') dateTime: string,
    @Query('locationName') name: string,
  ) {
    let result = await this.trafficService.getTraffic(dateTime);
    if (name) {
      const location = await this.locationService.findBy(name);
      console.log({
        location,
        items: result.items[0].cameras.map((c) => c.location),
      });
      result = {
        ...result,
        items: result.items.map((item) => ({
          ...item,
          cameras: item.cameras.filter(
            (item) =>
              item.location.latitude.toFixed(3) === location[0].lat &&
              item.location.longitude.toFixed(3) === location[0].lng,
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

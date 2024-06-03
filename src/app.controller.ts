import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TrafficService } from './traffic.service';
import { WeatherService } from './weather.service';
import { LocationsService } from './locations/locations.service';
import HaversineDistance from './utils/haversineDistance';

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
      const [location] = await this.locationService.findBy(name);
      if (!location) {
        return result;
      }
      result = {
        ...result,
        items: result.items.map((item) => ({
          ...item,
          cameras: item.cameras
            .map((item) => ({
              ...item,
              distance: HaversineDistance(
                { lat: item.location.latitude, lng: item.location.longitude },
                {
                  lat: parseFloat(location.lat),
                  lng: parseFloat(location.lng),
                },
              ),
            }))
            .filter((i) => i.distance <= 5.0),
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

import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TrafficService } from './traffic.service';
import { LocationsService } from './locations/locations.service';

@Controller({
  path: '/api/v1/',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly trafficService: TrafficService,
    private readonly locationsService: LocationsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/traffic')
  async locationForDateAndTime(@Query('dateTime') dateTime: string) {
    const traffic = await this.trafficService.getTraffic(dateTime);
    return {
      hello: traffic.items,
    };
  }
}

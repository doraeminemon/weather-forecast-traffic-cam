import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class TrafficService {
  constructor(private readonly httpService: HttpService) {}

  async getTraffic(dateTime: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://api.data.gov.sg/v1/transport/traffic-images', {
          params: { date_time: dateTime },
        })
        .pipe(
          catchError(() => {
            throw 'An error happened';
          }),
        ),
    );
    return data;
  }
}

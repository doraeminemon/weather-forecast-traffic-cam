import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

type Camera = {
  timestamp: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
  camera_id: string;
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
};

type TrafficItem = {
  timestamp: string;
  cameras: Camera[];
};

type TrafficResponse = {
  items: TrafficItem[];
  api_info: {
    status: string;
  };
};

@Injectable()
export class TrafficService {
  constructor(private readonly httpService: HttpService) {}

  async getTraffic(dateTime: string): Promise<TrafficResponse> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<TrafficResponse>(
          'https://api.data.gov.sg/v1/transport/traffic-images',
          {
            params: { date_time: dateTime },
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

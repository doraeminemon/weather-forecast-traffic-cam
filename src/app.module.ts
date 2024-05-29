import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TrafficService } from './traffic.service';
import { LocationsModule } from './locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './locations/entities/location.entity';

@Module({
  imports: [
    HttpModule,
    LocationsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'weather-forecast-traffic-cam',
      entities: [Location],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TrafficService],
})
export class AppModule {}

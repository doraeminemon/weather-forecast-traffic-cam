import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TrafficService } from './traffic.service';
import { LocationsModule } from './locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
          }
        : {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'weather-forecast-traffic-cam',
            entities: [__dirname + '/../**/*.entity.js'],
            synchronize: true,
          },
    ),
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TrafficService],
})
export class AppModule {}

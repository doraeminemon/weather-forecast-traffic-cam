import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationsRepository.create(createLocationDto);
  }

  findAll() {
    return this.locationsRepository.find();
  }

  findBy(name: string) {
    return this.locationsRepository.findBy({ name });
  }

  findOne(id: number) {
    return this.locationsRepository.findOne({ where: { id } });
  }

  async bulkUpsert(createLocationDtos: CreateLocationDto[]) {
    return this.locationsRepository.upsert(createLocationDtos, ['name']);
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.locationsRepository.update({ id }, updateLocationDto);
  }

  async remove(id: number) {
    const location = await this.locationsRepository.findOne({ where: { id } });
    return this.locationsRepository.remove(location);
  }
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('numeric')
  lat: string;

  @Column('numeric')
  lng: string;
}

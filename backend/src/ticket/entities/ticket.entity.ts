import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Location } from '../../location/entities/location.entity';
import { Accountable } from '../../accountable/entities/accountable.entity';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'address', type: 'varchar', length: 255 })
  address: string;

  @ManyToOne(
    () => Accountable,
    (accountable: Accountable) => accountable.tickets,
  )
  public accountable: Accountable;

  @ManyToOne(
    () => Accountable,
    (accountable: Accountable) => accountable.tickets,
  )
  public clerk: Accountable;

  @Column({
    name: 'status',
    type: 'varchar',
    enum: ['PENDING', 'IN PROGRESS', 'COMPLETE'],
  })
  status: string;

  @ManyToOne(() => Location, (location: Location) => location.tickets)
  public location: Location;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Location } from '../../location/entities/location.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity()
export class Accountable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'address', type: 'varchar', length: 255 })
  address: string;

  @OneToMany(() => Company, (company: Company) => company.accountable, {
    cascade: true,
  })
  @JoinColumn()
  public companies: Company[];

  @ManyToOne(() => Location, (location: Location) => location.accountables, {
    onDelete: 'CASCADE',
  })
  public location: Location;

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.accountable, {
    cascade: true,
  })
  @JoinColumn()
  public tickets: Ticket[];

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

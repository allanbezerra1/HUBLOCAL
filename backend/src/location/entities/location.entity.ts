import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Accountable } from '../../accountable/entities/accountable.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  address: string;

  @ManyToOne(() => Company, (company: Company) => company.locations, {
    onDelete: 'CASCADE',
  })
  public company: Company;

  @OneToMany(
    () => Accountable,
    (accountable: Accountable) => accountable.location,
    { cascade: true },
  )
  @JoinColumn()
  public accountables: Accountable[];

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.location, {
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

  @DeleteDateColumn()
  deletedAt: Date;
}

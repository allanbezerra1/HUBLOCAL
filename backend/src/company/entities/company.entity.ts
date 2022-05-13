import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Accountable } from '../../accountable/entities/accountable.entity';
import { Location } from '../../location/entities/location.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'cpnj', type: 'varchar', length: 50 })
  cnpj: string;

  @Column({ name: 'description', type: 'varchar', nullable: true, length: 255 })
  description?: string;

  @ManyToOne(
    () => Accountable,
    (accountable: Accountable) => accountable.companies,
    { onDelete: 'CASCADE' },
  )
  public accountable: Accountable;

  @OneToMany(() => Location, (location: Location) => location.company, {
    cascade: true,
  })
  @JoinColumn()
  public locations: Location[];

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

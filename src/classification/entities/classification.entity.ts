import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'classifications' })
export class Classification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

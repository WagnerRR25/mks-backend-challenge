import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

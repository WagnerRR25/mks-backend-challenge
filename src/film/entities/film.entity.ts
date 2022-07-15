import { Category } from 'src/category/entities/category.entity';
import { Classification } from 'src/classification/entities/classification.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  sinopse: string;

  @ManyToOne(() => Category, (category) => category.film)
  categories: Category;

  @ManyToOne(() => Classification, (classification) => classification.film)
  classifications: Classification;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

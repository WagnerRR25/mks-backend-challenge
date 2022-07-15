import { Film } from 'src/film/entities/film.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'classifications' })
export class Classification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @OneToMany(() => Film, (film) => film.classifications)
  film: Film[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

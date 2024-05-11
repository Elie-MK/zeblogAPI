import { Articles } from 'src/articles/entities/articles.entity';
import { Users } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  idComments: number;

  @Column('varchar')
  contents: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ManyToOne(() => Users, (user) => user.comments)
  idUser: Users;

  @ManyToOne(() => Articles, (art) => art.comments)
  articles: Articles;
}

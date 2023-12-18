import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25 })
  username: string;

  @Column({ type: 'varchar', length: 25 })
  email: string;

  @Column({ type: 'varchar', select:false })
  password: string;

  @Column({ type: 'varchar', nullable:false  })
  pictureProfile: string;

  @Column({ type: 'varchar' })
  createAt: Date;
}

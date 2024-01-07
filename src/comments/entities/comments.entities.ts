import { Articles } from "src/articles/entities/articles.entities";
import { Users } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Comments {

    @PrimaryGeneratedColumn()
    idComments:number

    @Column('varchar')
    contents:string

    @Column({ type:'timestamp', default:()=>'CURRENT_TIMESTAMP' })
    createAt: Date;
    
    @ManyToOne(() => Users, user => user.comments) 
    @JoinColumn({ name: 'idUser' }) 
    idUser:Users

    @ManyToOne(() => Articles, art => art.comments)
    @JoinColumn({name:'idArticles'})
    articles:Articles
}
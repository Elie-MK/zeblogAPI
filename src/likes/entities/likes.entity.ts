import { Articles } from "src/articles/entities/articles.entities";
import { Users } from "src/auth/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, ManyToOne, JoinColumn } from "typeorm";


export enum LikeEnum {
    Like = "like",
    Dislike = "dislike",
    Neutral = "neutral"
}

@Entity()
@Unique(["idUser", "idArticles"])
export class Likes {
    @PrimaryGeneratedColumn()
    idLike:number

    @Column({type:"int"})
    idUser:number

    @Column({type:"int"})
    idArticles:number

    @Column({type:"enum", enum:LikeEnum, default:LikeEnum.Neutral})
    likeStatus:LikeEnum

    @ManyToOne(()=>Articles, (art) => art.likes)
    @JoinColumn({name:"idArticles"})
    article:Articles

    @ManyToOne(()=>Users, (user) => user.likes)
    @JoinColumn({name:"idUser"})
    user:Users
}
import { Articles } from "src/articles/entities/articles.entities";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategorieEnum } from "../enum/categorieEnum";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    idCat:number

    @Column({type:"varchar"})
    name:CategorieEnum

    @OneToMany(()=>Articles, (art) => art.categories)
    articles:Articles
}
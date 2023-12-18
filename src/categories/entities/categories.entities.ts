import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    idCat:number

    @Column({type:'varchar', nullable:false, unique:true})
    nameCat:string
}
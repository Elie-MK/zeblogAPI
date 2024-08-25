import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoinTableFavoriteArticle1724200148146 implements MigrationInterface {
    name = 'AddJoinTableFavoriteArticle1724200148146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_article" ("usersIdUser" integer NOT NULL, "articleIdArticles" integer NOT NULL, CONSTRAINT "PK_3669439cebc07d32ef54b92edbc" PRIMARY KEY ("usersIdUser", "articleIdArticles"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45f9ef9c1563ef3b7aacf937df" ON "favorite_article" ("usersIdUser") `);
        await queryRunner.query(`CREATE INDEX "IDX_264262eeaacfb5ca864330f00f" ON "favorite_article" ("articleIdArticles") `);
        await queryRunner.query(`ALTER TABLE "favorite_article" ADD CONSTRAINT "FK_45f9ef9c1563ef3b7aacf937df3" FOREIGN KEY ("usersIdUser") REFERENCES "users"("idUser") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_article" ADD CONSTRAINT "FK_264262eeaacfb5ca864330f00fb" FOREIGN KEY ("articleIdArticles") REFERENCES "article"("idArticles") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_article" DROP CONSTRAINT "FK_264262eeaacfb5ca864330f00fb"`);
        await queryRunner.query(`ALTER TABLE "favorite_article" DROP CONSTRAINT "FK_45f9ef9c1563ef3b7aacf937df3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_264262eeaacfb5ca864330f00f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45f9ef9c1563ef3b7aacf937df"`);
        await queryRunner.query(`DROP TABLE "favorite_article"`);
    }

}

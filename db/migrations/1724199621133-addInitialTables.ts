import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitialTables1724199621133 implements MigrationInterface {
    name = 'AddInitialTables1724199621133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("idComments" SERIAL NOT NULL, "contents" character varying NOT NULL, "articleId" integer NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "userIdUser" integer, "articlesIdArticles" integer, CONSTRAINT "PK_6980b248c05c6ef296ac7d31690" PRIMARY KEY ("idComments"))`);
        await queryRunner.query(`CREATE TYPE "public"."likes_likestatus_enum" AS ENUM('LIKE', 'DISLIKE', 'NEUTRAL')`);
        await queryRunner.query(`CREATE TABLE "likes" ("idLike" SERIAL NOT NULL, "idUser" integer NOT NULL, "idArticles" integer NOT NULL, "likeStatus" "public"."likes_likestatus_enum" NOT NULL DEFAULT 'NEUTRAL', CONSTRAINT "UQ_33b51b3cceb5ec2aa3e0eae6b14" UNIQUE ("idUser", "idArticles"), CONSTRAINT "PK_27a3e1adba696e13ffb89059668" PRIMARY KEY ("idLike"))`);
        await queryRunner.query(`CREATE TYPE "public"."article_category_enum" AS ENUM('Technology', 'Travel', 'Food', 'Fitness', 'Lifestyle', 'Fashion', 'Health', 'Books', 'Sports', 'Entertainment', 'DIY', 'Music', 'Personal Development', 'Business', 'Education', 'Science', 'Art', 'Parenting', 'Hobbies', 'Photography', 'Gaming', 'Design', 'Social Media', 'Political', 'None')`);
        await queryRunner.query(`CREATE TABLE "article" ("idArticles" SERIAL NOT NULL, "Title" character varying NOT NULL, "Content" character varying NOT NULL, "CreateAt" TIMESTAMP NOT NULL DEFAULT now(), "pictures" character varying NOT NULL, "category" "public"."article_category_enum" NOT NULL DEFAULT 'None', "userIdUser" integer, CONSTRAINT "PK_e4310664371a0c42d81327b8c92" PRIMARY KEY ("idArticles"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE', 'NONE')`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "users" ("idUser" SERIAL NOT NULL, "fullName" character varying(50) NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "username" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "countryName" character varying(200) NOT NULL, "streetAdress" character varying(200) NOT NULL, "password" character varying NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'NONE', "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "pictureProfile" character varying NOT NULL, "description" character varying, "facebookLink" character varying, "XLink" character varying, "InstagramLink" character varying, "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4b2bf18167e94dce386d714c67f" UNIQUE ("fullName"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_65e7c74bbeaca3cb19ae90bf6ee" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`CREATE TABLE "zoho_oauth_token" ("id" SERIAL NOT NULL, "client_secret" character varying(255) NOT NULL, "client_id" character varying(255) NOT NULL, "refresh_token" character varying(255) NOT NULL, "access_token" character varying(255) NOT NULL, "expiry_time" integer NOT NULL, "grant_token" character varying(20) NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_951766d95217850faed43100cdc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_453ca0eac2135b5cd7ddafe0b44" FOREIGN KEY ("userIdUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e87cd4769fb86ed807ec4d7dd69" FOREIGN KEY ("articlesIdArticles") REFERENCES "article"("idArticles") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_141b9f9b1b2f1ab555b12440b7a" FOREIGN KEY ("idArticles") REFERENCES "article"("idArticles") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_942a5746aaa94aa943b4028bffb" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_f7ad577ba71f833262b0e9d782e" FOREIGN KEY ("userIdUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_f7ad577ba71f833262b0e9d782e"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_942a5746aaa94aa943b4028bffb"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_141b9f9b1b2f1ab555b12440b7a"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e87cd4769fb86ed807ec4d7dd69"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_453ca0eac2135b5cd7ddafe0b44"`);
        await queryRunner.query(`DROP TABLE "zoho_oauth_token"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TYPE "public"."article_category_enum"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TYPE "public"."likes_likestatus_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWhatsappColumn1723993884968 implements MigrationInterface {
    name = 'AddWhatsappColumn1723993884968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "WhatsappLink" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "WhatsappLink"`);
    }

}

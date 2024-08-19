import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveWhatsappColumn1723994020537 implements MigrationInterface {
    name = 'RemoveWhatsappColumn1723994020537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "WhatsappLink"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "WhatsappLink" character varying`);
    }

}
